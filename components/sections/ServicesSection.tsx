import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Terminal,
  Briefcase,
  Compass,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  iconType: "technology" | "business" | "consulting";
  phonePreview: {
    bannerTitle: string;
    subheading: string;
    description: string;
    badge1: string;
    badge2: string;
    metric: string;
    metricLabel: string;
  };
}

const servicesList: ServiceItem[] = [
  {
    id: "technology",
    title: "Technology Services",
    subtitle: "Custom AI & Production Systems",
    description:
      "Custom machine learning models, deterministic generative systems, and reliable infrastructure engineered to run cleanly inside your production stack.",
    link: "/services/technology",
    iconType: "technology",
    phonePreview: {
      bannerTitle: "TECH CORE",
      subheading: "Production AI Infrastructure",
      description:
        "Models built around your proprietary data and workflows, from high-throughput predictive APIs to enterprise RAG pipelines.",
      badge1: "Sub-20ms Inference",
      badge2: "Private VPC 24/7",
      metric: "99.95%",
      metricLabel: "Production SLA",
    },
  },
  {
    id: "business",
    title: "Business Services",
    subtitle: "Intelligent Operational Workflows",
    description:
      "Practical AI automation applied directly to the mission-critical workflows that keep your enterprise operations running smoothly.",
    link: "/services/business",
    iconType: "business",
    phonePreview: {
      bannerTitle: "BUSINESS OPS",
      subheading: "Automated Workflows",
      description:
        "Take repetitive, rules-heavy document processing and manual triage off your team's plate with verifiable precision.",
      badge1: "Zero Friction",
      badge2: "Continuous Sync",
      metric: "85%",
      metricLabel: "Operational Time Saved",
    },
  },
  {
    id: "consulting",
    title: "AI Consulting",
    subtitle: "Strategic Roadmaps & Technical Audits",
    description:
      "Independent technical advisory, data-readiness audits, and deterministic safety guardrails to prioritize high-value initiatives and guarantee ROI.",
    link: "/services/consulting",
    iconType: "consulting",
    phonePreview: {
      bannerTitle: "AI STRATEGY",
      subheading: "Strategic Execution",
      description:
        "Find the real enterprise bottlenecks worth solving with an honest feasibility audit — zero hype, no vendor lock-in.",
      badge1: "Feasibility Audit",
      badge2: "100% IP Retained",
      metric: "Zero",
      metricLabel: "Proprietary Lock-in",
    },
  },
];

export function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("technology");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const activeService =
    servicesList.find((s) => s.id === activeId) || servicesList[0];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden py-14 sm:py-18 lg:py-22 bg-[var(--bg)] border-b border-[var(--border-subtle)]"
    >
      <Container>
        {/* Master Card Container: Dark Blue for BOTH Light and Dark themes per user instruction */}
        <Reveal>
          <div className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[#090e24] text-white p-5 sm:p-8 lg:p-12 xl:p-14 shadow-2xl border border-slate-800 overflow-visible">
            {/* Header Block matching the Reference Image */}
            <div className="max-w-[760px] space-y-3 mb-6 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                What do We{" "}
                <span className="text-sky-400">Offer?</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
                Our journey started with a dedication to engineering and enterprise technology,
                leading us to specialize in{" "}
                <strong className="font-bold text-sky-400">
                  Production AI Systems
                </strong>
              </p>
            </div>

            {/* Interactive Services List with Floating Mockup */}
            <div className="relative space-y-2.5 sm:space-y-3.5 pt-1">
              {servicesList.map((service) => {
                const isActive = service.id === activeId;

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveId(service.id)}
                    className="relative cursor-pointer transition-all duration-200 group"
                  >
                    {/* Active Solid Deep Blue Pill vs Inactive Row */}
                    <a
                      href={service.link}
                      className={`relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3.5 sm:py-4.5 lg:py-5 px-4 sm:px-6 lg:px-8 xl:pr-[260px] transition-all duration-200 ${
                        isActive
                          ? "rounded-2xl sm:rounded-full bg-[#1d4ed8] text-white shadow-xl shadow-blue-600/25 border border-sky-400/30 md:scale-[1.006]"
                          : "rounded-2xl sm:rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/15"
                      }`}
                    >
                      {/* Left: Icon & Title */}
                      <div className="flex items-center gap-3 sm:gap-4 w-full md:w-[220px] lg:w-[250px] shrink-0 justify-between md:justify-start">
                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                          {/* 3D-Styled Brand Icons matching Reference */}
                          <div className="shrink-0 flex items-center justify-center">
                            {service.iconType === "technology" && (
                              /* Angled 3D Terminal Icon matching reference */
                              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-slate-900 shadow-md flex items-center justify-center transform rotate-[-4deg]">
                                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700 stroke-[2.5]" />
                              </div>
                            )}

                            {service.iconType === "business" && (
                              <div
                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                                  isActive
                                    ? "bg-white/20 shadow-inner"
                                    : "bg-white/10 text-white shadow-sm"
                                }`}
                              >
                                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                              </div>
                            )}

                            {service.iconType === "consulting" && (
                              <div
                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                                  isActive
                                    ? "bg-white/20 shadow-inner"
                                    : "bg-white/10 text-white shadow-sm"
                                }`}
                              >
                                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                              </div>
                            )}
                          </div>

                          {/* Title & Subtitle */}
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white truncate sm:overflow-visible">
                              {service.title}
                            </h3>
                            <span
                              className={`text-[11px] sm:text-xs block font-medium mt-0.5 truncate ${
                                isActive ? "text-sky-200" : "text-slate-400"
                              }`}
                            >
                              {service.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Mobile action arrow */}
                        <div className="md:hidden shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                              isActive
                                ? "bg-white text-blue-700 shadow-sm"
                                : "border border-white/20 text-slate-300"
                            }`}
                          >
                            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                          </div>
                        </div>
                      </div>

                      {/* Middle: Description Text with Balanced Width (no awkward stretching on tablet) */}
                      <div className="flex-1 md:px-2 lg:px-4 w-full md:max-w-md lg:max-w-xl">
                        <p
                          className={`text-xs sm:text-sm lg:text-[14px] leading-relaxed transition-colors ${
                            isActive
                              ? "text-slate-100 font-medium"
                              : "text-slate-400 font-normal"
                          }`}
                        >
                          {service.description}
                        </p>

                        {/* On mobile/tablet: Show active telemetry pills */}
                        {isActive && (
                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 lg:hidden pt-2 border-t border-white/15">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-[10px] font-semibold text-white">
                              {service.phonePreview.badge1}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-[10px] font-semibold text-white">
                              {service.phonePreview.badge2}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/30 text-[10px] font-bold text-sky-200">
                              {service.phonePreview.metric} {service.phonePreview.metricLabel}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Circular Arrow Action Button (tablet/desktop) */}
                      <div className="hidden md:block shrink-0">
                        <div
                          className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isActive
                              ? "bg-white text-blue-700 shadow-md scale-105"
                              : "border border-white/20 text-slate-300 group-hover:border-white/50 group-hover:text-white"
                          }`}
                        >
                          <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 stroke-[2.2]" />
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}

              {/* Floating 3D Phone Mockup with Cinematic IntersectionObserver Trigger */}
              <div
                className={`hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  top:
                    activeId === "technology"
                      ? "22%"
                      : activeId === "business"
                      ? "50%"
                      : "78%",
                }}
              >
                <div className="relative w-[220px] sm:w-[235px] rounded-[34px] bg-white p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.95)] transform rotate-[9deg] hover:rotate-[6deg] transition-transform duration-500 border border-slate-200">
                  {/* Phone Screen Container */}
                  <div className="rounded-[26px] overflow-hidden bg-slate-50 text-slate-800 text-[11px]">
                    {/* Blue Hero Banner matching "ABOUT SECT..." in reference */}
                    <div className="bg-[#1d4ed8] text-white p-4 pt-5 pb-4 text-center relative overflow-hidden">
                      <span className="block text-[14px] font-black tracking-tight uppercase">
                        {activeService.phonePreview.bannerTitle}
                      </span>

                      {/* Small mock indicators */}
                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        <span className="inline-block px-1.5 py-0.5 rounded bg-white/20 text-[9px] font-semibold">
                          {activeService.phonePreview.badge1}
                        </span>
                        <span className="inline-block px-1.5 py-0.5 rounded bg-white/20 text-[9px] font-semibold">
                          {activeService.phonePreview.badge2}
                        </span>
                      </div>
                    </div>

                    {/* Middle Phone Content: Avatars + Copy */}
                    <div className="p-3.5 space-y-3 bg-white">
                      {/* Avatars row */}
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          <img
                            src="/images/team/alex-morgan.jpg"
                            alt="Lead Engineer"
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-white"
                          />
                          <img
                            src="/images/team/samira-patel.jpg"
                            alt="AI Architect"
                            className="w-5 h-5 rounded-full object-cover ring-1 ring-white"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800">
                          {activeService.phonePreview.subheading}
                        </span>
                      </div>

                      {/* Short Blurb */}
                      <p className="text-[10px] text-slate-600 leading-tight">
                        {activeService.phonePreview.description}
                      </p>

                      {/* Pill Action Button */}
                      <div className="pt-0.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[9px] shadow-sm">
                          <span>Explore Offering</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>

                      {/* Bottom Micro Metrics */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 font-mono text-[9px]">
                        <span className="font-bold text-slate-500">IA·CORE</span>
                        <span className="font-bold text-blue-700">
                          {activeService.phonePreview.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right CTA Button matching "Get a Quote ↗" in reference */}
            <div className="mt-10 sm:mt-12 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-400 font-medium">
                <span>Looking for bespoke enterprise architecture? </span>
                <a
                  href="/services"
                  className="text-sky-400 font-semibold hover:underline"
                >
                  Explore all service specifications →
                </a>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-tight shadow-xl shadow-blue-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

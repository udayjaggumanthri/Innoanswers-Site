import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Hero } from "../components/hero/Hero";
import { AboutSection } from "../components/sections/AboutSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { IndustriesSection } from "../components/sections/IndustriesSection";
import HorizontalFeatureReveal from "../components/ui/horizontal-feature-reveal";
import { PricingSection } from "../components/sections/PricingSection";
import { ClientsSection } from "../components/sections/ClientsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { CtaBand } from "../components/sections/CtaBand";

export const metadata = {
  title: "iNNOAnswers — Solving tough problems with AI-driven solutions",
  description: "AI expertise meets industry knowledge. Practical, outcome-focused AI solutions with no jargon — just results.",
};

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 z-50 origin-left pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      style={{ scaleX }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      {/* Precision Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* 1. Signature Ambient Hero with Smooth Parallax */}
      <Hero />

      {/* 2. About iNNOAnswers & Engineering Architecture */}
      <AboutSection />

      {/* 3. Core AI Services & Capabilities */}
      <ServicesSection />

      {/* 4. Industries We Serve */}
      <IndustriesSection />

      {/* Horizontal Feature Reveal (Pin & Scrub Showcase) */}
      <HorizontalFeatureReveal />

      {/* 5. Engagement Models & Delivery Framework (TRANSPARENT ENGAGEMENT MODELS) */}
      <PricingSection />

      {/* 6. Client Proof & Testimonials */}
      <ClientsSection />
      <TestimonialsSection />

      {/* 7. Pre-Footer Gradient CTA Banner */}
      <CtaBand />
    </>
  );
}

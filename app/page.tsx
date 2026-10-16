import { Hero } from "../components/hero/Hero";
import { AboutSection } from "../components/sections/AboutSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { IndustriesSection } from "../components/sections/IndustriesSection";
import { PricingSection } from "../components/sections/PricingSection";
import { ClientsSection } from "../components/sections/ClientsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { Faq } from "../components/sections/Faq";
import { CtaBand } from "../components/sections/CtaBand";

export const metadata = {
  title: "Innoanswers — Solving tough problems with AI-driven solutions",
  description: "AI expertise meets industry knowledge. Practical, outcome-focused AI solutions with no jargon — just results.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. SaaSly-Style Signature Hero with Interactive Platform Showcase */}
      <Hero />

      {/* 2. About Innoanswers & Engineering Architecture */}
      <AboutSection />

      {/* 3. Core AI Services & Capabilities */}
      <ServicesSection />

      {/* 4. Industries We Serve */}
      <IndustriesSection />

      {/* 5. Engagement Models & Delivery Framework (SaaSly Signature Tiers) */}
      <PricingSection />

      {/* 6. Client Proof & Testimonials */}
      <ClientsSection />
      <TestimonialsSection />

      {/* 7. Enterprise FAQs with Advisory Support Card */}
      <Faq />

      {/* 8. Pre-Footer Gradient CTA Banner */}
      <CtaBand />
    </>
  );
}

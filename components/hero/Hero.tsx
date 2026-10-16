import React from "react";
import { ArrowRight, Star, ShieldCheck, CheckCircle } from "lucide-react";
import { ThreeDCard } from "../3d/ThreeDCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-16 bg-[var(--bg)] border-b border-[var(--border-subtle)]" id="top">
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Content Block */}
        <div className="max-w-[880px] mx-auto text-center space-y-5 sm:space-y-6">
          {/* Clean Responsive Eyebrow Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-xs text-[var(--muted-text)] max-w-full text-center shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0" />
            <span className="uppercase tracking-wider font-bold text-[11px] text-[var(--ink)]">
              INNOANSWERS
            </span>
            <span className="opacity-30">·</span>
            <span className="font-medium text-[11px] sm:text-xs">
              Outcome-Focused Enterprise AI Engineering
            </span>
          </div>

          {/* Primary Monumental H1 with Solid High-Contrast Typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink)] leading-[1.12]">
            Solving tough enterprise problems with AI-driven solutions.
          </h1>

          {/* Crisp, Direct Sub-headline */}
          <p className="max-w-[700px] mx-auto text-sm sm:text-base lg:text-lg text-[var(--body-text)] leading-relaxed font-normal">
            AI expertise meets industry knowledge. We engineer deterministic machine learning systems that eliminate operational bottlenecks — with zero jargon and full client code &amp; IP sovereignty.
          </p>

          {/* High-Intent Dual CTA Suite */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <a
              href="/contact"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base tracking-tight shadow-md transition-all duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <span>Talk to our team</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </a>

            <a
              href="#services"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 px-6 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--ink)] text-sm sm:text-base font-medium tracking-tight shadow-sm transition-all duration-200 hover:bg-[var(--surface-hover)] hover:border-slate-400 dark:hover:border-slate-600 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <span>Explore services &amp; case studies</span>
            </a>
          </div>

          {/* Clean Social Proof & Rating Metadata */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--muted-text)]">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-[var(--bg)] object-cover"
                src="/images/team/alex-morgan.jpg"
                alt="AI Leader"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-[var(--bg)] object-cover"
                src="/images/team/samira-patel.jpg"
                alt="ML Leader"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-[var(--bg)] object-cover"
                src="/images/team/jordan-rivera.jpg"
                alt="Ops Leader"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-[var(--bg)] object-cover"
                src="/images/testimonials/marcus-thorne.jpg"
                alt="Enterprise Client"
              />
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[var(--ink)]">4.9/5 Rating</span>
            <span className="opacity-40">·</span>
            <span>Over 180+ Enterprise Deployments</span>
          </div>
        </div>

        {/* Enterprise Client Logos Marquee */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--muted-text)] mb-6">
            TRUSTED BY DATA &amp; ENGINEERING TEAMS AT INDUSTRY INNOVATORS
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 items-center justify-center">
            {[
              { name: "FINCORE GLOBAL", category: "Financial Tech" },
              { name: "VERTEX HEALTH", category: "Life Sciences" },
              { name: "APEX ROBOTICS", category: "Autonomous Systems" },
              { name: "AEROVANCE", category: "Global Logistics" },
              { name: "STRATOS DEFENSE", category: "Aerospace" },
              { name: "NEXTGEN ENERGY", category: "Utilities Grid" },
            ].map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center h-16 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 transition-all duration-200 hover:border-blue-500/50 hover:bg-[var(--surface-hover)] group cursor-default shadow-xs"
              >
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--muted-text)] group-hover:text-[var(--ink)] transition-colors">
                  {client.name}
                </span>
                <span className="text-[10px] text-[var(--muted-text)] opacity-60">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

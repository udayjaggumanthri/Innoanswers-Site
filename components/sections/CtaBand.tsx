import React from "react";
import { ArrowRight, ShieldCheck, Clock, Award, CheckCircle2 } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20 bg-[var(--bg)] border-b border-[var(--border-subtle)]">
      <Container>
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#090e24] p-8 sm:p-12 lg:p-14 text-center shadow-xl">
            <div className="relative z-10 max-w-[760px] mx-auto space-y-5">
              {/* Eyebrow */}
              <div className="eyebrow mx-auto justify-center">
                <span className="uppercase tracking-wider font-semibold text-xs text-sky-400">
                  START YOUR PROJECT
                </span>
                <span className="opacity-30">·</span>
                <span className="font-medium text-xs text-slate-300">
                  Confidential Scoping
                </span>
              </div>

              {/* High-Impact Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
                Ready to solve your toughest operational challenges with AI?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-[620px] mx-auto leading-relaxed font-normal">
                Schedule a confidential scoping session with our principal engineers. We'll evaluate your feasibility and deliver an honest roadmap — no jargon, guaranteed.
              </p>

              {/* Action Suite */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base tracking-tight shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <span>Talk to our team</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </a>

                <a
                  href="/services"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 px-7 rounded-full border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-medium text-sm sm:text-base tracking-tight transition-all duration-200"
                >
                  <span>Explore All Services</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800 mt-8 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-400" />
                  <span>Strict NDA Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-sky-400" />
                  <span>24-Hour Response Window</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-sky-400" />
                  <span>100% IP &amp; Code Ownership</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

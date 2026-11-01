import React from "react";
import { clientsContent } from "../../content/clients";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function ClientsSection() {
  return (
    <section className="bg-[var(--bg)] py-14 sm:py-18 lg:py-20 border-t border-[var(--border-subtle)] relative">
      <Container>
        <div className="text-center max-w-[680px] mx-auto space-y-3">
          <Reveal>
            <div className="eyebrow mx-auto justify-center">
              <span>{clientsContent.eyebrow}</span>
            </div>
          </Reveal>

          <Reveal delayMs={70}>
            <h2 className="section-h2 text-[var(--ink)]">
              {clientsContent.headline}
            </h2>
          </Reveal>
        </div>

        {/* 12 Client Logos in a Responsive Grid */}
        <div className="mt-8 sm:mt-11 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4.5">
          {clientsContent.clients.map((client, idx) => (
            <Reveal key={client.id} delayMs={(idx % 6) * 50}>
              <div
                className="group flex h-20 sm:h-22 items-center justify-center rounded-2xl bg-white dark:bg-white/[0.97] border border-slate-200/80 dark:border-white/10 px-4 py-2 transition-all duration-300 hover:shadow-lg hover:border-blue-500/60 hover:scale-[1.03] cursor-default shadow-xs"
                title={client.name}
              >
                {client.logoSrc ? (
                  <img
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    className="max-h-8 sm:max-h-9 max-w-[115px] sm:max-w-[130px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-[13px] sm:text-[14px] font-bold tracking-tight text-slate-800 uppercase select-none">
                    {client.name}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

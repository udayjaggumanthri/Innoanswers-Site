import { clientsContent } from "../../content/clients";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function ClientsSection() {
  return (
    <section className="bg-[var(--bg)] py-10 sm:py-12 lg:py-14 border-t border-[var(--border-subtle)] relative">
      <Container>
        <div className="text-center max-w-[640px] mx-auto space-y-3">
          <Reveal>
            <span className="eyebrow mx-auto justify-center">
              {clientsContent.eyebrow}
            </span>
          </Reveal>

          <Reveal delayMs={80}>
            <h2 className="section-h2 text-[var(--ink)]">
              {clientsContent.headline}
            </h2>
          </Reveal>
        </div>

        {/* 6 Logo slots with vector SVGs rendered cleanly in both dark and light mode */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clientsContent.clients.map((client, idx) => (
            <Reveal key={client.id} delayMs={idx * 60}>
              <div
                className="group flex h-24 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 transition-all duration-300 hover:border-[var(--accent)]/60 hover:bg-[var(--surface-hover)] shadow-sm cursor-default"
                title={client.name}
              >
                {client.logoSrc ? (
                  <img
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    className="max-h-7 max-w-[120px] opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 dark:invert dark:brightness-150"
                  />
                ) : (
                  <span className="text-[15px] font-semibold tracking-wider text-[var(--muted-text)] transition-colors duration-200 group-hover:text-[var(--accent)] uppercase select-none">
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

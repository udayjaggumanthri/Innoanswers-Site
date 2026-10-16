import React from "react";
import { FileText, Shield, CheckCircle2, ArrowLeft } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { Reveal } from "../../components/ui/Reveal";

export const metadata = {
  title: "Terms & Conditions — Innoanswers Inc.",
  description:
    "Enterprise terms of service, engagement agreements, intellectual property ownership, and service level assurances for Innoanswers clients.",
};

export default function TermsPage() {
  const lastUpdated = "October 16, 2026";

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[var(--bg)] min-h-screen">
      <section className="py-12 border-b border-[var(--border-subtle)] bg-[var(--bg-alt)]">
        <Container>
          <div className="max-w-3xl mx-auto space-y-4">
            <Reveal>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-[var(--muted-text)] font-mono uppercase tracking-wider">
                <FileText className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <span>Legal Framework & Agreement</span>
              </div>
            </Reveal>

            <Reveal delayMs={60}>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
                Terms &amp; Conditions of Service
              </h1>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="text-sm text-[var(--muted-text)]">
                Effective Date: {lastUpdated} · Standard Enterprise Agreement
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--body-text)] leading-relaxed text-sm sm:text-base">
            <Reveal>
              <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 text-[var(--ink)] space-y-2">
                <h2 className="font-bold text-base sm:text-lg flex items-center gap-2 text-blue-600 dark:text-sky-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  100% Client Intellectual Property Rights
                </h2>
                <p className="text-xs sm:text-sm text-[var(--body-text)]">
                  Upon settlement of engagement milestones, all custom source code, model weights, pipeline configurations, and technical documentation generated for your organization become your exclusive intellectual property.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={50}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing our website or engaging Innoanswers Inc. for custom software development, machine learning engineering, or AI consulting services, you agree to be bound by these Terms &amp; Conditions and any accompanying Master Services Agreement (MSA) or Statement of Work (SOW).
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  2. Scope of Services &amp; Deliverables
                </h2>
                <p>
                  Services delivered by Innoanswers Inc. include Technology Services (ML/AI engineering), Business Services (process automation), and AI Consulting (strategic advisory). Specific technical requirements, milestones, acceptance criteria, and SLAs are defined in individual SOWs executed between the parties.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={110}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  3. Intellectual Property Ownership
                </h2>
                <p>
                  Unlike SaaS platforms that retain control over model weights and fine-tuned artifacts, Innoanswers operates under a total work-for-hire model:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  <li><strong>Client IP:</strong> All client data, proprietary domain knowledge, and custom model weights remain 100% owned by the client.</li>
                  <li><strong>Custom Code:</strong> All source code written specifically for the engagement is assigned exclusively to the client upon final payment.</li>
                  <li><strong>Pre-existing Tools:</strong> Open-source tools or pre-existing internal libraries used remain subject to their respective open-source licenses or perpetual, non-exclusive client licenses.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  4. Warranties &amp; Service Level Agreements (SLAs)
                </h2>
                <p>
                  Innoanswers warrants that all engineering deliverables will be constructed in a professional manner adhering to modern software engineering standards. For clients subscribing to ongoing SLA maintenance, we guarantee 99.95% uptime for deployed private VPC microservices and sub-24h ticket response times.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={170}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  5. Contact &amp; Legal Inquiries
                </h2>
                <p>
                  If you have questions regarding these terms or wish to execute a custom enterprise Master Services Agreement (MSA), please reach out to:
                </p>
                <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] text-xs sm:text-sm space-y-1 font-mono">
                  <p className="font-bold text-[var(--ink)] font-sans">Legal &amp; Contracts Department</p>
                  <p>Innoanswers Inc.</p>
                  <p>Email: legal@innoanswers.com</p>
                  <p>Phone: +1 (800) 555-0199</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

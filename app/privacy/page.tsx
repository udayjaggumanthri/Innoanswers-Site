import React from "react";
import { Shield, Lock, Eye, CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { Reveal } from "../../components/ui/Reveal";

export const metadata = {
  title: "Privacy Policy — Innoanswers Inc.",
  description:
    "Learn how Innoanswers protects enterprise data sovereignty, private VPC deployments, and confidential information across all AI and software engineering engagements.",
};

export default function PrivacyPolicyPage() {
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
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Data Protection & Privacy</span>
              </div>
            </Reveal>

            <Reveal delayMs={60}>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
                Privacy Policy &amp; Data Governance
              </h1>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="text-sm text-[var(--muted-text)]">
                Effective Date: {lastUpdated} · Version 3.2 (Production Standard)
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--body-text)] leading-relaxed text-sm sm:text-base">
            <Reveal>
              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-[var(--ink)] space-y-2">
                <h2 className="font-bold text-base sm:text-lg flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Enterprise Data Sovereignty Guarantee
                </h2>
                <p className="text-xs sm:text-sm text-[var(--body-text)]">
                  Innoanswers builds machine learning models and automation engines that run strictly inside your organization’s private cloud VPC or on-premise infrastructure. We do not aggregate, sell, or utilize client training data for third-party model tuning.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={50}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  1. Information We Collect
                </h2>
                <p>
                  When you visit our website, schedule a confidential scoping session, or interact with our enterprise services, we collect limited personal and organizational information necessary to deliver our solutions:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  <li><strong>Contact Information:</strong> Name, professional email address, company name, job title, and telephone number when voluntarily submitted via contact forms.</li>
                  <li><strong>Technical Credentials & Access:</strong> Temporary credentials or secrets provided under NDA strictly for private cloud VPC deployment and data architecture assessment.</li>
                  <li><strong>Usage Analytics:</strong> Anonymized website interaction data collected through privacy-first telemetry to maintain security and site stability.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  2. How We Use Client Data
                </h2>
                <p>
                  All information collected is strictly governed by our Non-Disclosure Agreement (NDA) and Master Services Agreement (MSA). We utilize client data solely to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  <li>Engineers, test, and deploy customized machine learning models inside your isolated private VPC.</li>
                  <li>Provide customer support, SLA telemetry monitoring, and technical maintenance.</li>
                  <li>Conduct security audits, data schema validations, and HIPAA/SOC2 compliance checks.</li>
                  <li>Respond to inquiries, deliver project proposals, and manage billing documentation.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={110}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  3. Zero Model Training Leakage
                </h2>
                <p>
                  We enforce zero-retention policies across all third-party model integrations (e.g. Azure OpenAI, Anthropic Bedrock). Proprietary company intellectual property, customer documents, vector embeddings, and database schemas never leave your secure perimeter without explicit, encrypted approval.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  4. Security &amp; Encryption Standards
                </h2>
                <p>
                  Innoanswers maintains enterprise-grade security posture across all operations:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  <li><strong>In-Transit:</strong> TLS 1.3 encryption across all website and API communications.</li>
                  <li><strong>At-Rest:</strong> AES-256 encryption for all stored records and temporary diagnostic backups.</li>
                  <li><strong>Access Control:</strong> Strict Role-Based Access Control (RBAC) and mandatory Multi-Factor Authentication (MFA) for all engineering personnel.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={170}>
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  5. Your Rights &amp; Data Protection Officer Contact
                </h2>
                <p>
                  You retain the right to request access to, correction of, or complete deletion of any personal data stored in our CRM systems. To exercise these rights or request a signed NDA prior to sharing project details, please contact:
                </p>
                <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] text-xs sm:text-sm space-y-1 font-mono">
                  <p className="font-bold text-[var(--ink)] font-sans">Data Protection &amp; Legal Compliance Office</p>
                  <p>Innoanswers Inc.</p>
                  <p>Email: legal@innoanswers.com</p>
                  <p>Phone: +1 (800) 555-0199</p>
                  <p>Address: 100 Enterprise Way, Suite 400, San Francisco, CA 94105</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

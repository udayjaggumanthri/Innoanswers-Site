import React, { useState } from "react";
import { siteConfig } from "../../content/site";
import { submitContact, ContactFormData } from "../../lib/contact";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Reveal } from "../../components/ui/Reveal";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { ThreeDCard } from "../../components/3d/ThreeDCard";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Innoanswers to discuss your business bottlenecks and find out if AI is the right tool.",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    company: "",
    interest: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please describe what problem you are trying to solve.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstField);
      element?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusMessage("Submitting your message...");

    try {
      const result = await submitContact(formData);
      if (result.success) {
        setIsSubmitted(true);
        setStatusMessage(result.message);
      }
    } catch {
      setStatusMessage("An error occurred. Please try again or reach out via email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-36">
      {/* Page Header */}
      <section className="relative overflow-hidden py-14 lg:py-20 border-b border-[var(--border-subtle)]">
        <Container className="relative z-10">
          <div className="max-w-[820px] space-y-5">
            <Reveal>
              <span className="eyebrow">Contact us</span>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="page-h1 text-[var(--ink)]">Let's talk about your problem.</h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="lead-text text-[var(--body-text)]">
                Tell us what you're trying to solve. We'll reply with honest next steps: no jargon, no hard sell.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Accessible Form with 3D Depth */}
            <div className="lg:col-span-7">
              <ThreeDCard className="rounded-2xl" maxTilt={4} scale={1.008}>
                <Card className="p-5 sm:p-8 lg:p-10 shadow-lg">
                {/* Live region for accessibility */}
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="sr-only"
                >
                  {statusMessage}
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-hover)] border border-[var(--accent)] text-[var(--accent)] shadow-sm">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl font-medium text-[var(--ink)]">
                      Message Received
                    </h2>
                    <p className="text-[16px] text-[var(--body-text)] max-w-md mx-auto leading-relaxed">
                      {statusMessage}
                    </p>
                    <div className="pt-6">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: "",
                            email: "",
                            company: "",
                            interest: "",
                            message: "",
                            honeypot: "",
                          });
                        }}
                      >
                        Send another message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Honeypot field (hidden from screen reader & visuals) */}
                    <div style={{ display: "none" }} aria-hidden="true">
                      <label htmlFor="hp_check">Leave this empty</label>
                      <input
                        type="text"
                        id="hp_check"
                        name="hp_check"
                        tabIndex={-1}
                        value={formData.honeypot || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, honeypot: e.target.value })
                        }
                        autoComplete="off"
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                      >
                        Full name <span className="text-blue-600 dark:text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: "" });
                        }}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        className={`w-full rounded-xl border bg-white dark:bg-[#060b24] px-4 py-3 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-[var(--accent)] ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30"
                        }`}
                        placeholder="e.g. Sarah Jenkins"
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="mt-1.5 text-xs text-red-500">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                      >
                        Work email <span className="text-blue-600 dark:text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full rounded-xl border bg-white dark:bg-[#060b24] px-4 py-3 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-[var(--accent)] ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30"
                        }`}
                        placeholder="sarah@company.com"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#060b24] px-4 py-3 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors hover:border-slate-400 dark:hover:border-white/30 focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-[var(--accent)]"
                        placeholder="Company name"
                      />
                    </div>

                    {/* I'm interested in - Fixed with explicit contrast in light & dark */}
                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                      >
                        I'm interested in
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            interest: e.target.value as ContactFormData["interest"],
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#060b24] px-4 py-3 text-[15px] text-slate-900 dark:text-white transition-colors hover:border-slate-400 dark:hover:border-white/30 focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-[var(--accent)] cursor-pointer"
                      >
                        <option value="" className="bg-white text-slate-900 dark:bg-[#060b24] dark:text-white">
                          Select an area of interest
                        </option>
                        <option value="Technology Services" className="bg-white text-slate-900 dark:bg-[#060b24] dark:text-white">
                          Technology Services
                        </option>
                        <option value="Business Services" className="bg-white text-slate-900 dark:bg-[#060b24] dark:text-white">
                          Business Services
                        </option>
                        <option value="Consulting" className="bg-white text-slate-900 dark:bg-[#060b24] dark:text-white">
                          Consulting
                        </option>
                        <option value="Not sure yet" className="bg-white text-slate-900 dark:bg-[#060b24] dark:text-white">
                          Not sure yet
                        </option>
                      </select>
                    </div>

                    {/* How can we help? */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                      >
                        How can we help? <span className="text-blue-600 dark:text-[var(--accent)]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`w-full rounded-xl border bg-white dark:bg-[#060b24] px-4 py-3 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-[var(--accent)] ${
                          errors.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30"
                        }`}
                        placeholder="Describe your current bottleneck, workflow, or what you are hoping to achieve..."
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-[var(--accent)] dark:text-[#030718] dark:hover:brightness-110 px-8 text-sm font-semibold tracking-tight shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? "Sending message..." : "Send message"}
                      </button>
                    </div>
                  </form>
                )}
                </Card>
              </ThreeDCard>
            </div>

            {/* Right Column: Contact Details & "What happens next" with 3D Depth */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Information */}
              <ThreeDCard className="rounded-2xl" maxTilt={5} scale={1.015}>
                <Card className="p-7 sm:p-8 space-y-6 shadow-md">
                  <h2 className="text-xl font-medium text-[var(--ink)]">
                    Direct channels
                  </h2>

                  <ul className="space-y-4 text-[15px]">
                    <li className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--muted-text)]">
                          Email
                        </p>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--muted-text)]">
                          Phone
                        </p>
                        <a
                          href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                          className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--muted-text)]">
                          Location
                        </p>
                        <p className="text-[var(--ink)]">{siteConfig.contact.address}</p>
                      </div>
                    </li>
                  </ul>

                  <p className="text-xs text-[var(--muted-text)] border-t border-[var(--border-subtle)] pt-4">
                    Office hours: {siteConfig.contact.hours}
                  </p>
                </Card>
              </ThreeDCard>

              {/* What Happens Next */}
              <ThreeDCard className="rounded-2xl" maxTilt={5} scale={1.015}>
                <Card className="p-7 sm:p-8 space-y-5 bg-[var(--surface)] shadow-md">
                  <h2 className="text-xl font-medium text-[var(--ink)]">
                    What happens next
                  </h2>

                  <ol className="space-y-4 text-[15px]">
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-hover)] text-[var(--accent)] border border-[var(--border-subtle)] text-xs font-semibold">
                        1
                      </span>
                      <span className="text-[var(--body-text)]">
                        We read your message and assign the right domain specialist.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-hover)] text-[var(--accent)] border border-[var(--border-subtle)] text-xs font-semibold">
                        2
                      </span>
                      <span className="text-[var(--body-text)]">
                        We reply within 1–2 business days to arrange a short discovery call.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-hover)] text-[var(--accent)] border border-[var(--border-subtle)] text-xs font-semibold">
                        3
                      </span>
                      <span className="text-[var(--body-text)]">
                        We outline concrete next steps together — with zero hard sell.
                      </span>
                    </li>
                  </ol>
                </Card>
              </ThreeDCard>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  interest: "Technology Services" | "Business Services" | "Consulting" | "Not sure yet" | "";
  message: string;
  honeypot?: string; // Hidden spam prevention trap
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

/**
 * Stub contact form handler.
 * TODO: connect to your preferred delivery mechanism:
 * - Formspree (https://formspree.io)
 * - Resend API / Serverless function (https://resend.com)
 * - Webhook or internal CRM endpoint
 *
 * NOTE: For this static deployment, no sensitive keys or backend databases exist.
 */
export async function submitContact(data: ContactFormData): Promise<ContactSubmissionResult> {
  // Honeypot check: if filled, quietly succeed without doing anything
  if (data.honeypot && data.honeypot.trim() !== "") {
    return {
      success: true,
      message: "Thank you for reaching out. We will review your message.",
    };
  }

  // Simulated short network turnaround for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 600));

  // In production, dispatch `fetch('/api/contact', { ... })` or third-party webhook here.
  return {
    success: true,
    message: "Thank you for reaching out. We will review your message and reply promptly to schedule a short call.",
  };
}

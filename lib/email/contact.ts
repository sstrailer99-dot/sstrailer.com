import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  message: string;
};

const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

export function isContactEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getContactRecipient() {
  return process.env.CONTACT_EMAIL_TO?.trim() || "info@sstrailers.net";
}

/** Parse "Display Name <email@domain.com>" or plain email from RESEND_FROM. */
export function getResendFromEmail() {
  const raw = process.env.RESEND_FROM?.trim();
  if (!raw) return DEFAULT_FROM_EMAIL;

  const wrapped = raw.match(/<([^>]+)>/);
  if (wrapped) return wrapped[1].trim();

  return raw;
}

/** Keep From simple — Resend rejects complex display names with @ or parentheses. */
export function buildEnquiryFrom() {
  const fromEmail = getResendFromEmail();
  return `SS Trailers Website <${fromEmail}>`;
}

export function buildCustomerReplyFrom() {
  const fromEmail = getResendFromEmail();
  return `SS Trailers <${fromEmail}>`;
}

export function mapResendError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("only send testing emails") || lower.includes("verify a domain")) {
    return "Resend is in test mode. Verify sstrailers.net at resend.com/domains, then set RESEND_FROM=website@sstrailers.net.";
  }

  if (lower.includes("not verified") || lower.includes("domain mismatch")) {
    return "Your domain is not verified in Resend yet. Add DNS records for sstrailers.net in the Resend dashboard.";
  }

  if (lower.includes("invalid `from`") || lower.includes("invalid from")) {
    return "Sender address is invalid. Set RESEND_FROM=website@sstrailers.net after domain verification.";
  }

  if (lower.includes("api key") || lower.includes("unauthorized")) {
    return "Email API key is invalid. Check RESEND_API_KEY in server environment variables.";
  }

  return "Could not send your message. Please call or WhatsApp us directly.";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEnquiryHtml(payload: ContactPayload) {
  return `
    <h2>New quote request — SS Trailers website</h2>
    <p style="margin:0 0 1rem;padding:12px;background:#f4f6f8;border-left:4px solid #0a2342;">
      <strong>Submitted by:</strong> ${escapeHtml(payload.name)}<br>
      <strong>Phone:</strong> ${escapeHtml(payload.phone)}<br>
      ${payload.email ? `<strong>Email:</strong> ${escapeHtml(payload.email)}<br>` : ""}
      ${payload.company ? `<strong>Company:</strong> ${escapeHtml(payload.company)}` : ""}
    </p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
    <p style="color:#666;font-size:13px;margin-top:1.5rem;">
      Hit <strong>Reply</strong> to respond directly to the customer.
    </p>
  `;
}

function buildEnquiryText(payload: ContactPayload) {
  return [
    "New quote request — SS Trailers website",
    "",
    `Submitted by: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    "",
    payload.message,
    "",
    "Reply to this email to respond directly to the customer.",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildSubject(payload: ContactPayload) {
  const companyPart = payload.company ? ` — ${payload.company}` : "";
  return `[Website] Quote from ${payload.name}${companyPart}`;
}

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY.");
  }

  const resend = new Resend(apiKey);
  const to = getContactRecipient();

  const { error: enquiryError } = await resend.emails.send({
    from: buildEnquiryFrom(),
    to: [to],
    replyTo: payload.email || getContactRecipient(),
    subject: buildSubject(payload),
    text: buildEnquiryText(payload),
    html: buildEnquiryHtml(payload),
  });

  if (enquiryError) {
    throw new Error(enquiryError.message);
  }

  if (payload.email) {
    const { error: confirmError } = await resend.emails.send({
      from: buildCustomerReplyFrom(),
      to: [payload.email],
      replyTo: getContactRecipient(),
      subject: "We received your enquiry — SS Trailers Dubai",
      text: `Hello ${payload.name},\n\nThank you for contacting SS Trailers. We received your enquiry and will respond shortly.\n\nPhone / WhatsApp: +971 54 512 9979\nEmail: info@sstrailers.net\n\n— SS Trailers Team`,
      html: `
        <p>Hello ${escapeHtml(payload.name)},</p>
        <p>Thank you for contacting <strong>SS Trailers</strong>. We received your enquiry and will respond shortly.</p>
        <p>
          <strong>Phone / WhatsApp:</strong> +971 54 512 9979<br>
          <strong>Email:</strong> info@sstrailers.net
        </p>
        <p>— SS Trailers Team</p>
      `,
    });

    if (confirmError) {
      console.error("[contact] auto-reply failed:", confirmError.message);
    }
  }
}

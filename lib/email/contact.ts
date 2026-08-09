import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  message: string;
};

const DEFAULT_FROM_EMAIL = "website@sstrailers.net";

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

/** Inbox "From" shows the visitor name — not info@sstrailers.net. */
export function buildEnquiryFrom(payload: ContactPayload) {
  const fromEmail = getResendFromEmail();
  const visitor = payload.email
    ? `${payload.name} (${payload.email})`
    : `${payload.name} — ${payload.phone}`;

  return `${visitor} via SS Trailers Website <${fromEmail}>`;
}

/** Auto-replies to customers come from your business address. */
export function buildCustomerReplyFrom() {
  const replyFrom = process.env.RESEND_REPLY_FROM?.trim();
  if (replyFrom) return replyFrom;

  return `SS Trailers <${getContactRecipient()}>`;
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

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY.");
  }

  const resend = new Resend(apiKey);
  const to = getContactRecipient();

  const { error: enquiryError } = await resend.emails.send({
    from: buildEnquiryFrom(payload),
    to: [to],
    replyTo: payload.email || undefined,
    subject: `[Website] Quote from ${payload.name}${payload.company ? ` — ${payload.company}` : ""}`,
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

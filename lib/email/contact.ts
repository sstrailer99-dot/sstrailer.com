import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  message: string;
};

export function isContactEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getContactRecipient() {
  return process.env.CONTACT_EMAIL_TO?.trim() || "info@sstrailers.net";
}

export function getResendFromAddress() {
  return (
    process.env.RESEND_FROM?.trim() ||
    "SS Trailers <onboarding@resend.dev>"
  );
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
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    ${payload.email ? `<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>` : ""}
    ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
  `;
}

function buildEnquiryText(payload: ContactPayload) {
  return [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    "",
    payload.message,
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
  const from = getResendFromAddress();

  const { error: enquiryError } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email || undefined,
    subject: `Quote request from ${payload.name}`,
    text: buildEnquiryText(payload),
    html: buildEnquiryHtml(payload),
  });

  if (enquiryError) {
    throw new Error(enquiryError.message);
  }

  if (payload.email) {
    const { error: confirmError } = await resend.emails.send({
      from,
      to: [payload.email],
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

import { NextResponse } from "next/server";
import {
  isContactEmailConfigured,
  mapResendError,
  sendContactEmail,
} from "@/lib/email/contact";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  if (!isContactEmailConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Add RESEND_API_KEY to your server environment.",
      },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const company = clean(body.company, 160);
  const message = clean(body.message, 4000);

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Name, phone and message are required." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, phone, email: email || undefined, company: company || undefined, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    console.error("[contact]", detail);
    return NextResponse.json(
      { error: mapResendError(detail) },
      { status: 500 },
    );
  }
}

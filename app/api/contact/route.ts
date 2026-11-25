import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  business: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(1).max(20),
  reason: z.string().trim().min(1).max(50),
  message: z.string().trim().max(2000).optional().default(""),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > 10000) {
      return NextResponse.json({ success: false }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  const token = process.env.CONTACT_API_TOKEN;
  if (!token?.trim()) {
    console.error("CONTACT_API_NOT_CONFIGURED");
    return NextResponse.json({ success: false }, { status: 503 });
  }

  const { firstName, business, email, phone, reason, message } = parsed.data;
  try {
    const response = await fetch("https://tasks.advartit.in/api/v1/contact-enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-Contact-Token": token },
      body: JSON.stringify({ name: firstName, business_name: business, email, phone, purpose: reason, message }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
      cache: "no-store",
    });
    const raw = await response.text();
    let result: Record<string, unknown> | null = null;
    let invalidJson = false;
    if (raw.trim()) {
      try {
        const value: unknown = JSON.parse(raw);
        if (value && typeof value === "object" && !Array.isArray(value)) {
          result = value as Record<string, unknown>;
        } else {
          invalidJson = true;
        }
      } catch {
        invalidJson = true;
      }
    }
    // Only allowlisted diagnostics: never log response bodies, headers or enquiry data.
    const missingBackendToken = raw.includes("CONTACT_FORM_TOKEN is not set on the server");
    const rejected = result?.success === false || Boolean(result?.error) || Boolean(result?.errors);
    if (process.env.NODE_ENV === "development") {
      console.info("CONTACT_API_RESPONSE", {
        upstreamStatus: response.status,
        diagnostic: missingBackendToken ? "CONTACT_FORM_TOKEN is not set on the server" :
          !response.ok ? "upstream_http_error" : invalidJson ? "invalid_json_response" :
          rejected ? "upstream_rejected" : "upstream_accepted",
      });
    }
    if (!response.ok) {
      const status = response.status >= 400 && response.status <= 599 ? response.status : 502;
      return NextResponse.json(
        { success: false, error: status === 503 ? "service_unavailable" : "upstream_rejected" },
        { status },
      );
    }
    if (invalidJson || rejected || missingBackendToken) {
      return NextResponse.json({ success: false, error: "unconfirmed_response" }, { status: 502 });
    }
    // A successful HTTP response confirms acceptance unless its body reports failure.
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT_API_ERROR");
    const timeout = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    return NextResponse.json({ success: false, error: timeout ? "upstream_timeout" : "upstream_unreachable" }, { status: timeout ? 504 : 502 });
  }
}

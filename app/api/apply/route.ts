import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    // Extract fields from FormData
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const location = formData.get("location") as string
    const experience = formData.get("experience") as string
    const notice_period = formData.get("notice_period") as string
    const current_ctc = formData.get("current_ctc") as string
    const expected_ctc = formData.get("expected_ctc") as string
    const portfolio_url = formData.get("portfolio_url") as string
    const source = String(formData.get("source") ?? "Advart Careers Page")
    const file = formData.get("file") as File | null
    const recaptchaToken = formData.get("recaptchaToken") as string

    // Verify reCAPTCHA token
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || process.env.RECAPTCHA_SECRET_KEY
    if (!recaptchaToken || !RECAPTCHA_SECRET) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    const params = new URLSearchParams()
    params.append("secret", RECAPTCHA_SECRET)
    params.append("response", recaptchaToken)
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
    const verifyJson = await verifyRes.json()
    if (!verifyJson.success) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA validation failed" }, { status: 400 })
    }

    // Basic server-side validation
    if (!name?.trim()) {
      return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 })
    }
    if (!role?.trim()) {
      return NextResponse.json({ ok: false, error: "Role is required" }, { status: 400 })
    }

    // Build FormData for external API (WITHOUT recaptchaToken)
    const externalFormData = new FormData()
    externalFormData.append("name", name)
    externalFormData.append("email", email)
    externalFormData.append("role", role)
    externalFormData.append("location", location)
    externalFormData.append("experience", experience)
    externalFormData.append("notice_period", notice_period)
    externalFormData.append("current_ctc", current_ctc)
    externalFormData.append("expected_ctc", expected_ctc)
    externalFormData.append("source", source)
    externalFormData.append("portfolio_url", portfolio_url)
    if (file) {
      externalFormData.append("file", file)
    }
    
    // Log what fields are being sent (without file content)
    console.log("Payload sent to external API:", {
      name,
      email,
      role,
      location,
      experience,
      notice_period,
      current_ctc,
      expected_ctc,
      portfolio_url,
      source,
      file: file ? file.name : "None"
    })
    
    // Submit to external API
    const API_BASE = (process.env.ADVART_API_BASE_URL || "https://tasks.advartit.in/website").replace(/\/+$/, "")
    const API_KEY = process.env.ADVART_API_KEY || ""
    
    console.log("API Configuration:", {
      API_BASE,
      hasApiKey: !!API_KEY,
    })
    
    const res = await fetch(`${API_BASE}/apply`, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
      },
      body: externalFormData,
    })
    
    console.log("External API Response:", {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok
    })

    const json = await res.json().catch(() => ({})) as Record<string, any>

    if (!res.ok) {
      const isDuplicate =
        json?.message?.toLowerCase().includes("already") ||
        json?.error?.toLowerCase().includes("duplicate") ||
        res.status === 400
      if (isDuplicate) {
        return NextResponse.json(
          { ok: false, error: "You have already applied for this role. We have your application on file and will reach out if there's a fit!" },
          { status: 400 }
        )
      }
      console.error("External API error:", res.status, json)
      return NextResponse.json({ ok: false, error: json?.message || json?.error || `Request failed: ${res.status}` }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: "Application submitted successfully.", application_id: json.application_id })
  } catch (err: any) {
    console.error("POST /api/apply error:", err)
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server errors" },
      { status: 500 }
    )
  }
}

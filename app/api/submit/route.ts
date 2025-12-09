import { type NextRequest } from "next/server"

type ApplicationData = {
  firstName: string
  lastName: string
  role: string
  noticePeriod: string
  location: string
  experience: string
  currentCTC: string
  expectedCTC: string
  portfolio: string
  resumeName?: string
  resumeType?: string
  resumeBase64?: string
  timestamp?: string
}

// Replace with your own Google Apps Script Web App URL if needed
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyedu0PSZ1AsMT5AMP5LVHWBzAoDgqOYtrFtsEH4-kbc8WQncuCmRuKh3cz4xnB2G0S/exec"

// Allow larger body size for resume base64
export const maxRequestBodySize = "10mb"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body) {
      return new Response(JSON.stringify({ error: "Request body is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const applicationData = { ...(body as ApplicationData) }

    // Normalize empty strings to "N/A"
    for (const key in applicationData) {
      const k = key as keyof ApplicationData
      const val = applicationData[k]
      if (typeof val === "string" && val.trim() === "") {
        ;(applicationData as any)[k] = "N/A"
      }
    }

    // Remove resume fields if no base64 provided
    if (
      !applicationData.resumeBase64 ||
      applicationData.resumeBase64.trim() === "" ||
      applicationData.resumeBase64 === "N/A"
    ) {
      delete applicationData.resumeBase64
      delete applicationData.resumeName
      delete applicationData.resumeType
    }

    // Relay to Google Apps Script
    const resp = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })

    const text = await resp.text()

    if (resp.ok && text.includes("Success")) {
      return new Response(text, { status: 200 })
    } else {
      return new Response(text || "Unknown error occurred", { status: 500 })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred"
    return new Response(JSON.stringify({ error: "Internal Server Error", message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

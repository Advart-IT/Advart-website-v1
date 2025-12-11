// sheets.ts
// Fetch & normalize jobs from Google Sheets via opensheet.elk.sh (read-only)
// + submitApplication(): send form submissions (incl. Role) to Google Sheets via Apps Script

import { Agent } from "http"
import { slugify } from "./slug"

export type RawRow = Record<string, string>

export type Job = {
  slug: string
  title: string
  jd: string
  location?: string
  experience?: string
  jobType?: string
  deadline?: string
  // Keep all original fields so we can show "Additional Info"
  raw: RawRow
}

// ======= READ: jobs (unchanged) =======

const SHEET_ID = "1IAcGUNbefwXBZ3NaykwXYZf3cjXliQIe4rpnT65rZuE"
const SHEET_NAME = "Post"
const OPEN_SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`

function pickFirst(row: RawRow, keys: string[]) {
  for (const k of keys) {
    if (row[k] && String(row[k]).trim().length > 0) return row[k]
  }
  return ""
}

export function normalizeRow(row: RawRow): Job {
  const title = pickFirst(row, ["Job Title", "Title", "title", "Role", "role"]).trim()
  const jd = pickFirst(row, ["JD", "Description", "description", "Job Description"]).trim()
  const location = pickFirst(row, ["location", "Location", "City"])
  const experience = pickFirst(row, ["Experience", "experience", "Years of Experience"])
  const jobType = pickFirst(row, ["job type", "Job Type", "Type", "type", "Employment Type"])
  const deadline = pickFirst(row, ["Deadline", "deadline", "Last date", "Closing Date"])

  return {
    slug: slugify(title || `${location}-${jobType}-${Math.random().toString(36).slice(2, 8)}`),
    title,
    jd,
    location: location || undefined,
    experience: experience || undefined,
    jobType: jobType || undefined,
    deadline: deadline || undefined,
    raw: row,
  }
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch(OPEN_SHEET_URL, {
      cache: "no-store", // prefer freshness for job listings
      // Force IPv4 only to avoid DNS resolution issues
      dispatcher: new Agent({ family: 4 }),
    } as any)
    if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status} ${res.statusText}`)
    const data = (await res.json()) as RawRow[]
    return data.map(normalizeRow).filter((j) => j.title) // keep only rows with a title
  } catch (err) {
    console.error("Failed to load job data:", err)
    return []
  }
}

export async function fetchJobBySlug(slug: string): Promise<Job | undefined> {
  const all = await fetchJobs()
  return all.find((j) => j.slug === slug)
}

// ======= WRITE: application submissions =======
// Uses a Google Apps Script Web App URL that appends to the spreadsheet.
// Put it in .env as NEXT_PUBLIC_SHEET_WEBHOOK_URL

export type ApplicationPayload = {
  // No last name (per your requirement)
  firstName: string
  role: string
  location: string
  experienceYears: string
  noticePeriod: string
  currentCtcLpa: string
  expectedCtcLpa: string
  portfolioUrl?: string
  // We don't upload files to Sheets; just send the client-side filename if you like
  resumeFileName?: string
}

/**
 * Submit an application row to Google Sheets via Apps Script Web App.
 * The Apps Script should accept JSON and write to your desired tab (e.g., "Applications").
 *
 * Env:
 *   NEXT_PUBLIC_SHEET_WEBHOOK_URL="https://script.google.com/.../exec"
 */
export async function submitApplication(payload: ApplicationPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const url = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL
    if (!url) throw new Error("Missing NEXT_PUBLIC_SHEET_WEBHOOK_URL")

    // Minimal client-side guardrails
    if (!payload.role?.trim()) throw new Error("Role is required")

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
    if (!res.ok || json?.ok === false) {
      throw new Error(json?.error || `Request failed: ${res.status}`)
    }

    return { ok: true }
  } catch (err: any) {
    console.error("submitApplication failed:", err)
    return { ok: false, error: err?.message || "Unknown error" }
  }
}

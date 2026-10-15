// jobs.ts
// Fetch & normalize jobs from AdvartIT REST API
// + submitApplication(): send applications via the same API

import { slugify } from "./slug"

// ======= Types =======

export type Job = {
  id: number
  slug: string
  title: string
  role: string
  experience: string
  location: string
  employmentType: string
  jobDescription: string
  requirements: string   // HTML string
  responsibilities: string // HTML string
  status: string
}

/** Shape returned by the API */
type ApiJob = {
  id: number
  title: string
  Role: string
  experience: string
  location: string
  employment_type: string
  salary: number
  job_description: string
  requirements: string
  responsibilities: string
  status: string
}

export type ApplicationPayload = {
  name: string
  email: string
  role: string
  location: string
  experience: number
  notice_period: string
  current_ctc: number
  expected_ctc: number
  portfolio_url: string
  // `file` may be a filename/string URL or a File object when using file uploads
  file: string | File | null
}

// ======= Config =======

const API_BASE = (process.env.ADVART_API_BASE_URL || "https://tasks.advartit.in/website").replace(/\/+$/, "")
const API_KEY  = process.env.ADVART_API_KEY || ""

function apiHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Key": API_KEY,
  }
}

// ======= Helpers =======

function normalizeApiJob(raw: ApiJob): Job {
  return {
    id: raw.id,
    slug: `${raw.id}-${slugify(raw.title)}`,
    title: raw.title,
    role: raw.Role,
    experience: raw.experience,
    location: raw.location,
    employmentType: raw.employment_type,
    jobDescription: raw.job_description,
    requirements: raw.requirements,
    responsibilities: raw.responsibilities,
    status: raw.status,
  }
}

// ======= READ =======

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_BASE}/roles/open`, {
      headers: apiHeaders(),
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)

    const data = (await res.json()) as ApiJob[]
    return data.map(normalizeApiJob)
  } catch (err) {
    console.error("Failed to load job data:", err)
    throw err
  }
}

export async function fetchJobBySlug(slug: string): Promise<Job | undefined> {
  // Extract numeric id from slug format "5-data-analyst"
  const idStr = slug.split("-")[0]
  const id = Number(idStr)

  const all = await fetchJobs()
  // Try matching by id first, fallback to full slug match
  if (!isNaN(id)) {
    return all.find((j) => j.id === id)
  }
  return all.find((j) => j.slug === slug)
}

// ======= WRITE =======

export async function submitApplication(
  payload: ApplicationPayload
): Promise<{ ok: true; application_id: number } | { ok: false; error: string; statusCode: number }> {
  try {
    const res = await fetch(`${API_BASE}/apply`, {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify(payload),
    })

    const json = await res.json().catch(() => ({})) as Record<string, any>

    if (!res.ok) {
      throw { message: json?.message || json?.error || `Request failed: ${res.status}`, statusCode: res.status }
    }

    return { ok: true, application_id: json.application_id }
  } catch (err: any) {
    console.error("submitApplication failed:", err)
    return { ok: false, error: err?.message || "Unknown error", statusCode: err?.statusCode || 500 }
  }
}

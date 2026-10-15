import { NextResponse } from "next/server"
import { fetchJobs } from "@/lib/jobs"

/** Return the list of open roles (id + title) for the open-application dropdown. */
export async function GET() {
  try {
    const jobs = await fetchJobs()
    const roles = jobs.map((j) => ({ id: j.id, title: j.title }))
    return NextResponse.json(roles)
  } catch (err: any) {
    console.error("GET /api/roles error:", err)
    return NextResponse.json([], { status: 500 })
  }
}

import Link from "next/link"
import { fetchJobBySlug } from "@/lib/jobs"
import ApplyForm from "@/components/apply-form"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const job = await fetchJobBySlug(params.slug)
  return {
    title: job ? `Apply – ${job.title}` : "Apply for a Role",
    description: job?.jd?.slice(0, 160) || "Submit your application.",
  }
}

export default async function ApplyJobPage({ params }: Props) {
  const job = await fetchJobBySlug(params.slug)

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-black py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-6 text-sm">
            <Link href="/careers" className="text-black hover:underline">
              ← Back to Positions
            </Link>
          </nav>

          {job ? (
            <>
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">{job.title}</h1>

                <div className="mt-3 flex flex-wrap gap-2">
                  {job.jobType && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                      {job.jobType}
                    </span>
                  )}
                  {job.location && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                      {job.location}
                    </span>
                  )}
                  {job.experience && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                      {job.experience}
                    </span>
                  )}
                  {job.deadline && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                      Apply by {job.deadline}
                    </span>
                  )}
                </div>

                {/* Full JD */}
                {job.jd && (
                  <section className="mt-6">
                    <h2 className="text-lg font-semibold">Job Description</h2>
                    <p className="mt-2 whitespace-pre-line">
                      {job.jd}
                    </p>
                  </section>
                )}
              </header>

              <ApplyForm defaultRole={job.title} lockRole />
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Job not found</h1>
              <p>
                The opening you're looking for may have been filled or removed.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
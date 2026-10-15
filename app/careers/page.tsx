import Link from "next/link"
import { fetchJobs, type Job } from "@/lib/jobs"
import OpenApplicationForm from "@/components/open-application-form"

// Opt out of static rendering — this page fetches live data from the API
export const dynamic = "force-dynamic"

export default async function CareersPage() {
  let jobs: Job[] = []
  let jobsUnavailable = false
  try {
    jobs = await fetchJobs()
  } catch {
    jobsUnavailable = true
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] text-black mt-24 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <section className="text-center mb-16 md:mb-24">
          <h1 className="heading1 font-bold mb-0">
            Whom are we <span className="text-[#ffdc38]">looking</span> for?
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Creatively Hungry and Unapologetically Adamant Hoomans!
          </p>
        </section>

        {jobsUnavailable ? (
          <p className="text-center" role="status">
            We couldn&apos;t load the current openings. Please try again later.
          </p>
        ) : jobs.length === 0 ? (
          <p className="text-center">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="p-6 rounded-lg border border-black bg-[#F6F7F9] flex flex-col justify-between gap-4"
              >
                <header>
                  <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                  <div className="text-sm space-x-2">
                    {job.location && <span>{job.location}</span>}
                    {job.employmentType && <span>{'• '}{job.employmentType}</span>}
                    {job.experience && (
                      <span>{'• '}{job.experience} years</span>
                    )}
                  </div>
                </header>

                {job.jobDescription && (
                  <div
                    className="mt-2 line-clamp-4 overflow-hidden text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                  />
                )}

                <Link
                  href={`/careers/${job.slug}/apply`}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label={`Apply now for ${job.title}`}
                >
                  Apply
                </Link>
              </article>
            ))}
          </div>
        )}

        <section
          aria-labelledby="open-application-title"
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="mb-6 text-center">
            <h2 id="open-application-title" className="text-2xl md:text-3xl font-bold">
              Didn&apos;t find the right role?
            </h2>
            <p className="mt-2">
              Send us an open application and we&apos;ll reach out when there&apos;s a fit.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-6 bg-[#F6F7F9]">
            <OpenApplicationForm />
          </div>
        </section>
      </div>
    </main>
  )
}

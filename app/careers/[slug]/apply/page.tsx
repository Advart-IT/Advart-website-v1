import { pageMetadata } from "@/lib/seo"
import Link from "next/link"
import { fetchJobBySlug } from "@/lib/jobs"
import ApplyForm from "@/components/apply-form"

// Opt out of static rendering — this page fetches live data from the API
export const dynamic = "force-dynamic"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const job = await fetchJobBySlug(slug)
    return pageMetadata(
        `/careers/${encodeURIComponent(slug)}/apply`,
        job ? `Apply - ${job.title}` : "Apply for a Role",
        job?.jobDescription?.replace(/<[^>]*>/g, "").slice(0, 160) || "Submit your application."
    )
}

export default async function ApplyJobPage({ params }: Props) {
    const { slug } = await params
    const job = await fetchJobBySlug(slug)

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
                                    {job.employmentType && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                                            {job.employmentType}
                                        </span>
                                    )}
                                    {job.location && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                                            {job.location}
                                        </span>
                                    )}
                                    {job.experience != null && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm">
                                            0-{Math.abs(Number(job.experience))} {Math.abs(Number(job.experience)) === 1 ? "year" : "years"} experience
                                        </span>
                                    )}
                                </div>

                                {/* Job Description */}
                                {job.jobDescription && (
                                    <section className="mt-6">
                                        <h2 className="text-lg font-semibold">Job Description</h2>
                                        <div
                                            className="mt-2 prose prose-sm max-w-none text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                                        />
                                    </section>
                                )}

                                {/* Requirements */}
                                {job.requirements && (
                                    <section className="mt-6">
                                        <h2 className="text-lg font-semibold">Requirements</h2>
                                        <div
                                            className="mt-2 prose prose-sm max-w-none text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: job.requirements }}
                                        />
                                    </section>
                                )}

                                {/* Responsibilities */}
                                {job.responsibilities && (
                                    <section className="mt-6">
                                        <h2 className="text-lg font-semibold">Responsibilities</h2>
                                        <div
                                            className="mt-2 prose prose-sm max-w-none text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                                        />
                                    </section>
                                )}
                            </header>

                            <ApplyForm
                                defaultRole={job.title}
                                defaultLocation={job.location}
                                lockRole
                            />
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Job not found</h1>
                            <p>
                                The opening you&apos;re looking for may have been filled or removed.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}
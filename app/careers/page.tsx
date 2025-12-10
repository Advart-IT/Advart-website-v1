// import Link from "next/link"
// import { fetchJobs } from "@/lib/jobs"
// import OpenApplicationForm from "@/components/open-application-form"


// export default async function CareersPage() {
//   const jobs = await fetchJobs()

//   return (
//     <main className="min-h-screen bg-[#F6F7F9] text-black mt-24 py-12 md:py-20">
//       <div className="container mx-auto px-4 md:px-6">
//         <section className="text-center mb-16 md:mb-24">
//           <h1 className="heading1 font-bold mb-0">
//             Whom are we <span className="text-[#ffdc38]">looking</span> for?
//           </h1>
//           <p className="text-lg md:text-xl max-w-2xl mx-auto">
//             Creatively Hungry and Unapologetically Adamant Hoomans!
//           </p>
//         </section>

//         {jobs.length === 0 ? (
//           <p className="text-center">No jobs found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//             {jobs.map((job: any) => (
//               <article
//                 key={job.slug}
//                 className="p-6 rounded-lg border border-black bg-[#F6F7F9] flex flex-col justify-between gap-4"
//               >
//                 <header>
//                   <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
//                   <div className="text-sm space-x-2">
//                     {job.location && <span>{job.location}</span>}
//                     {job.jobType && <span>{'• '}{job.jobType}</span>}
//                     {job.experience && <span>{'• '}{job.experience}</span>}
//                     {job.deadline && <span>{'• '}Apply by {job.deadline}</span>}
//                   </div>
//                 </header>

//                 {job.jd && (
//                   <div className="mt-2 line-clamp-4 overflow-hidden">
//                     <ul className="list-disc list-inside space-y-2">
//                       {job.jd
//                         .replace("Key Responsibilities:", "") // remove prefix
//                         .split("•") // split by bullet
//                         .map((point: string, index: number) =>
//                           point.trim() ? <li key={index}>{point.trim()}</li> : null
//                         )}
//                     </ul>
//                   </div>
//                 )}

//                 <Link
//                   href={`/careers/${job.slug}/apply`}
//                   className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
//                   aria-label={`Apply now for ${job.title}`}
//                 >
//                   Apply
//                 </Link>
//               </article>
//             ))}
//           </div>
//         )}

//         <section
//           aria-labelledby="open-application-title"
//           className="max-w-3xl mx-auto mt-12"
//         >
//           <div className="mb-6 text-center">
//             <h2 id="open-application-title" className="text-2xl md:text-3xl font-bold">
//               Didn&apos;t find the right role?
//             </h2>
//             <p className="mt-2">
//               Send us an open application and we&apos;ll reach out when there&apos;s a fit.
//             </p>
//           </div>

//           <div className="rounded-lg border border-gray-200 p-6 bg-[#F6F7F9]">
//             <OpenApplicationForm />
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }

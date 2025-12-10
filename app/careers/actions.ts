// "use server"

// import { z } from "zod"

// export type OpenApplicationState = {
//   ok: boolean
//   message: string
//   errors: Record<string, string[]>
// }

// const schema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Enter a valid email"),
//   desiredRole: z.string().min(2, "Please specify a desired role"),
//   location: z.string().optional().or(z.literal("")),
//   linkedinUrl: z
//     .string()
//     .url("Enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   portfolioUrl: z
//     .string()
//     .url("Enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   resumeUrl: z
//     .string()
//     .url("Enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   coverLetter: z.string().max(5000, "Cover letter is too long").optional().or(z.literal("")),
//   source: z.string().optional().or(z.literal("")),
// })

// export async function submitOpenApplication(
//   _prevState: OpenApplicationState,
//   formData: FormData
// ): Promise<OpenApplicationState> {
//   try {
//     const raw = Object.fromEntries(formData)
//     const parsed = schema.safeParse(raw)

//     if (!parsed.success) {
//       const fieldErrors = parsed.error.flatten().fieldErrors
//       return {
//         ok: false,
//         message: "Please fix the errors and try again.",
//         errors: Object.fromEntries(
//           Object.entries(fieldErrors).map(([k, v]) => [k, v?.filter(Boolean) ?? []])
//         ),
//       }
//     }

//     const data = parsed.data

//     // TODO: Persist to your system of record (Google Sheets, DB, email, etc.).
//     // For now, we "accept" the submission.
//     // Example shape:
//     // {
//     //   name: data.name,
//     //   email: data.email,
//     //   desiredRole: data.desiredRole,
//     //   location: data.location,
//     //   linkedinUrl: data.linkedinUrl,
//     //   portfolioUrl: data.portfolioUrl,
//     //   resumeUrl: data.resumeUrl,
//     //   coverLetter: data.coverLetter,
//     //   source: data.source,
//     //   submittedAt: new Date().toISOString(),
//     // }

//     // Simulate minimal processing latency.
//     await new Promise((r) => setTimeout(r, 400))

//     return {
//       ok: true,
//       message: "Thanks for your interest! We’ll review your profile and get back to you if there’s a fit.",
//       errors: {},
//     }
//   } catch (err) {
//     return {
//       ok: false,
//       message: "Something went wrong while submitting your application. Please try again.",
//       errors: {},
//     }
//   }
// }

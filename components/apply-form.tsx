// "use client"

// import type React from "react"
// import { useRef, useState } from "react"

// type FormData = {
//   firstName: string
//   role: string
//   noticePeriod: string
//   location: string
//   experience: string
//   currentCTC: string
//   expectedCTC: string
//   portfolio: string
// }

// export default function ApplyForm({
//   defaultRole = "",
//   lockRole = false,
// }: {
//   defaultRole?: string
//   lockRole?: boolean
// }) {
//   // one source of truth for control height/styles
//   const CONTROL =
//     "h-11 w-full px-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none"
//   const BTN =
//     "cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black"

//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     role: defaultRole || "",
//     noticePeriod: "",
//     location: "",
//     experience: "",
//     currentCTC: "",
//     expectedCTC: "",
//     portfolio: "",
//   })

//   const [selectedFileName, setSelectedFileName] = useState<string>("") // for UI preview

//   const fileInput = useRef<HTMLInputElement>(null)
//   const [submitting, setSubmitting] = useState(false)
//   const [submitted, setSubmitted] = useState(false)
//   const [error, setError] = useState("")

//   // supports both <input> and <select>
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const validateForm = (): boolean => {
//     const required: (keyof FormData)[] = [
//       "firstName",
//       "role",
//       "noticePeriod",
//       "location",
//       "experience",
//       "currentCTC",
//       "expectedCTC",
//     ]
//     for (const f of required) {
//       if (!String(form[f]).trim()) {
//         setError(
//           `Please fill in the ${String(f)
//             .replace(/([A-Z])/g, " $1")
//             .toLowerCase()} field`,
//         )
//         return false
//       }
//     }
//     const numericFields: Array<keyof FormData> = ["experience", "currentCTC", "expectedCTC"]
//     for (const nf of numericFields) {
//       const v = form[nf]
//       if (v && isNaN(Number(v))) {
//         setError(`${String(nf).replace(/([A-Z])/g, " $1")} must be a number`)
//         return false
//       }
//     }
//     return true
//   }

//   const validateFile = (file: File): string | null => {
//     if (!file) return null
//     if (file.type !== "application/pdf") return "Please upload a PDF file only"
//     if (file.size === 0) return "File appears to be empty"
//     if (file.size > 10 * 1024 * 1024) return "File size must be less than 10MB"
//     if (!file.name.toLowerCase().endsWith(".pdf")) return "File must have a .pdf extension"
//     return null
//   }

//   const withDefaults = (value: string) => (value.trim() === "" ? "N/A" : value)

//   const resetForm = () => {
//     setForm({
//       firstName: "",
//       role: "",
//       noticePeriod: "",
//       location: "",
//       experience: "",
//       currentCTC: "",
//       expectedCTC: "",
//       portfolio: "",
//     })
//     setSelectedFileName("")
//     if (fileInput.current) fileInput.current.value = ""
//   }

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault()
//     setSubmitting(true)
//     setError("")

//     if (!validateForm()) {
//       setSubmitting(false)
//       return
//     }

//     const resumeFile = fileInput.current?.files?.[0]
//     if (resumeFile) {
//       const err = validateFile(resumeFile)
//       if (err) {
//         setError(err)
//         setSubmitting(false)
//         return
//       }
//     }

//     const send = async (base64?: string, fileName?: string, fileType?: string) => {
//       const payload = {
//         firstName: withDefaults(form.firstName),
//         role: withDefaults(form.role),
//         noticePeriod: withDefaults(form.noticePeriod),
//         location: withDefaults(form.location),
//         experience: form.experience ? Number(form.experience) : "N/A",
//         currentCTC: form.currentCTC ? Number(form.currentCTC) : "N/A",
//         expectedCTC: form.expectedCTC ? Number(form.expectedCTC) : "N/A",
//         portfolio: withDefaults(form.portfolio),
//         resumeName: fileName || "N/A",
//         resumeType: fileType || "N/A",
//         resumeBase64: base64 || "",
//         timestamp: new Date().toISOString(),
//       }

//       try {
//         const res = await fetch("/api/submit", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         })
//         const txt = await res.text()
//         if (res.ok && txt.includes("Success")) {
//           setSubmitted(true)
//           resetForm()
//         } else {
//           throw new Error(txt || "Submission failed")
//         }
//       } catch (err) {
//         const msg = err instanceof Error ? err.message : "Unknown error"
//         setError("Failed to submit application: " + msg)
//       } finally {
//         setSubmitting(false)
//       }
//     }

//     if (resumeFile) {
//       const reader = new FileReader()
//       reader.onloadend = async () => {
//         if (typeof reader.result === "string") {
//           const base64 = reader.result.split(",")[1]
//           await send(base64, resumeFile.name, resumeFile.type)
//         } else {
//           setError("Failed to read resume file.")
//           setSubmitting(false)
//         }
//       }
//       reader.readAsDataURL(resumeFile)
//     } else {
//       await send()
//     }
//   }

//   const noticeOptions = [
//     "Immediate",
//     "7 days",
//     "15 days",
//     "30 days",
//     "45 days",
//     "60 days",
//     "90 days",
//     "Serving notice",
//   ]

//   return (
//     <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
//       {error && (
//         <div role="alert" className="mb-4 p-4 bg-white border border-gray-300 rounded-md">
//           <p className="text-black">{"❌ "}{error}</p>
//         </div>
//       )}

//       {submitted ? (
//         <div className="text-center">
//           <p className="text-black text-lg">✅ Your application has been submitted successfully!</p>
//           <p className="text-gray-600 mt-2">We&apos;ll review your application and get back to you soon.</p>
//         </div>
//       ) : (
//         <form className="space-y-4" aria-label="Job application form">
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//               First Name <span className="text-black">*</span>
//             </label>
//             <input
//               id="firstName"
//               type="text"
//               name="firstName"
//               value={form.firstName}
//               onChange={handleChange}
//               required
//               placeholder="Enter your first name"
//               className={CONTROL}
//             />
//           </div>

//           {/* Role on left, Location on right */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//                 Role <span className="text-black">*</span>
//               </label>
//               <input
//                 id="role"
//                 type="text"
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 required
//                 readOnly={lockRole}
//                 placeholder="Enter your role"
//                 className={`${CONTROL} ${lockRole ? "bg-gray-100 cursor-not-allowed" : ""}`}
//               />
//               {lockRole && (
//                 <p className="mt-1 text-xs text-gray-500">This role is prefilled from the job you selected.</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
//                 Location (City) <span className="text-black">*</span>
//               </label>
//               <input
//                 id="location"
//                 type="text"
//                 name="location"
//                 value={form.location}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your location (city)"
//                 className={CONTROL}
//               />
//             </div>
//           </div>

//           {/* Experience on left, Notice Period on right */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
//                 Experience (years) <span className="text-black">*</span>
//               </label>
//               <input
//                 id="experience"
//                 type="number"
//                 inputMode="decimal"
//                 step="0.01"
//                 min="0"
//                 name="experience"
//                 value={form.experience}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter experience (years)"
//                 className={CONTROL}
//               />
//             </div>

//             <div>
//               <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
//                 Notice Period <span className="text-black">*</span>
//               </label>
//               <select
//                 id="noticePeriod"
//                 name="noticePeriod"
//                 value={form.noticePeriod}
//                 onChange={handleChange}
//                 required
//                 className={CONTROL}
//               >
//                 <option value="" disabled>Select notice period</option>
//                 {noticeOptions.map((opt) => (
//                   <option key={opt} value={opt}>{opt}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="currentCTC" className="block text-sm font-medium text-gray-700 mb-1">
//                 Current CTC (LPA) <span className="text-black">*</span>
//               </label>
//               <input
//                 id="currentCTC"
//                 type="number"
//                 inputMode="decimal"
//                 step="0.01"
//                 min="0"
//                 name="currentCTC"
//                 value={form.currentCTC}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter current CTC (LPA)"
//                 className={CONTROL}
//               />
//             </div>

//             <div>
//               <label htmlFor="expectedCTC" className="block text-sm font-medium text-gray-700 mb-1">
//                 Expected CTC (LPA) <span className="text-black">*</span>
//               </label>
//               <input
//                 id="expectedCTC"
//                 type="number"
//                 inputMode="decimal"
//                 step="0.01"
//                 min="0"
//                 name="expectedCTC"
//                 value={form.expectedCTC}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter expected CTC (LPA)"
//                 className={CONTROL}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
//                 Portfolio (optional)
//               </label>
//               <input
//                 id="portfolio"
//                 type="text"
//                 name="portfolio"
//                 value={form.portfolio}
//                 onChange={handleChange}
//                 placeholder="Enter your portfolio"
//                 className={CONTROL}
//               />
//             </div>

//             {/* Custom file upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Resume (PDF only)
//               </label>

//               <div className="flex items-center">
//                 {/* Hidden real input */}
//                 <input
//                   id="resume"
//                   type="file"
//                   name="resume"
//                   ref={fileInput}
//                   accept="application/pdf"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0]
//                     setSelectedFileName(file ? file.name : "")
//                   }}
//                 />

//                 {/* Styled label as button */}
//                 <label htmlFor="resume" className={BTN}>
//                   Choose File
//                 </label>

//                 {/* Filename preview */}
//                 <span className="ml-3 text-sm text-gray-700 truncate">
//                   {selectedFileName || "No file chosen"}
//                 </span>
//               </div>

//               <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={submitting}
//             className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black disabled:opacity-50 focus:outline-none"
//           >
//             {submitting ? "Submitting..." : "Submit Application"}
//           </button>
//         </form>
//       )}
//     </div>
//   )
// }

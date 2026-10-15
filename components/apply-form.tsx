"use client"

import type React from "react"
import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

type FormData = {
  firstName: string
  email: string
  role: string
  noticePeriod: string
  location: string
  experience: string
  currentCTC: string
  expectedCTC: string
  portfolio: string
  resumeUrl: string
  resumeFile?: File | null
}
function getSource() {
  if (typeof window === "undefined") return "Advart Careers Page"

  const params = new URLSearchParams(window.location.search)

  return (
    params.get("utm_source") ||
    params.get("source") ||
    "Advart Careers Page"
  )
}
export default function ApplyForm({
  defaultRole = "",
  defaultLocation = "",
  lockRole = false,
}: {
  defaultRole?: string
  defaultLocation?: string
  lockRole?: boolean
}) {
  // one source of truth for control height/styles
  const CONTROL =
    "h-11 w-full px-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none"
  const BTN =
    "cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black"

  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    role: defaultRole || "",
    noticePeriod: "",
    location: defaultLocation || "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    portfolio: "",
    resumeUrl: "",
    resumeFile: null,
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  // supports both <input> and <select>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // file input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file only")
        e.target.value = ""
        return
      }
      // Validate file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setError("File size must be less than 5MB")
        e.target.value = ""
        return
      }
    }
    setForm((prev) => ({ ...prev, resumeFile: file }))
  }

  const validateForm = (): boolean => {
    const required: (keyof FormData)[] = [
      "firstName",
      "email",
      "role",
      "noticePeriod",
      "location",
      "experience",
      "currentCTC",
      "expectedCTC",
    ]
    for (const f of required) {
      if (!String(form[f]).trim()) {
        setError(
          `Please fill in the ${String(f)
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field`,
        )
        return false
      }
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address")
      return false
    }
    const numericFields: Array<keyof FormData> = ["experience", "currentCTC", "expectedCTC"]
    for (const nf of numericFields) {
      const v = form[nf]
      if (v && isNaN(Number(v))) {
        setError(`${String(nf).replace(/([A-Z])/g, " $1")} must be a number`)
        return false
      }
    }
    return true
  }

  const resetForm = () => {
    setForm({
      firstName: "",
      email: "",
      role: "",
      noticePeriod: "",
      location: "",
      experience: "",
      currentCTC: "",
      expectedCTC: "",
      portfolio: "",
      resumeUrl: "",
      resumeFile: null,
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    if (!validateForm()) {
      setSubmitting(false)
      return
    }

    if (!recaptchaToken && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setError("Please complete the reCAPTCHA")
      setSubmitting(false)
      return
    }

    const payload = {
      name: form.firstName.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      location: form.location.trim(),
      experience: Number(form.experience),
      notice_period: form.noticePeriod,
      current_ctc: Number(form.currentCTC),
      expected_ctc: Number(form.expectedCTC),
      portfolio_url: form.portfolio.trim() || "None",
      // prefer the uploaded File name, fall back to any text URL provided
      file: form.resumeFile ? form.resumeFile.name : form.resumeUrl.trim() || "None",
      recaptchaToken: recaptchaToken || undefined,
    }

    // Validate file is uploaded
    if (!form.resumeFile && !form.resumeUrl.trim()) {
      setError("Please upload a resume PDF file")
      setSubmitting(false)
      return
    }

    // Build FormData with actual file
    const formData = new FormData()
    formData.append("name", form.firstName.trim())
    formData.append("email", form.email.trim())
    formData.append("role", form.role.trim())
    formData.append("location", form.location.trim())
    formData.append("experience", String(form.experience))
    formData.append("source", getSource())
    formData.append("notice_period", form.noticePeriod)
    formData.append("current_ctc", String(form.currentCTC))
    formData.append("expected_ctc", String(form.expectedCTC))
    formData.append("portfolio_url", form.portfolio.trim() || "None")
    if (form.resumeFile) {
      formData.append("file", form.resumeFile)
    }
    if (recaptchaToken) {
      formData.append("recaptchaToken", recaptchaToken)
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      })
      const json = await res.json()
      if (res.ok && json.ok) {
        setSubmitted(true)
        resetForm()
      } else {
        throw new Error(json?.error || "Submission failed")
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      setError("Failed to submit application: " + msg)
    } finally {
      setSubmitting(false)
    }
  }

  const noticeOptions = [
    "Immediate",
    "7 days",
    "15 days",
    "30 days",
    "45 days",
    "60 days",
    "90 days",
    "Serving notice",
  ]

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-lg">
      {submitted ? (
        <div className="text-center">
          <p className="text-black text-lg">✅ Your application has been submitted successfully!</p>
          <p className="text-gray-600 mt-2">We&apos;ll review your application and get back to you soon.</p>
        </div>
      ) : (
        <form className="space-y-4" aria-label="Job application form">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-black">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className={CONTROL}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-black">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className={CONTROL}
              />
            </div>
          </div>

          {/* Role on left, Location on right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-black">*</span>
              </label>
              <input
                id="role"
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                readOnly={lockRole}
                placeholder="Enter your role"
                className={`${CONTROL} ${lockRole ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {lockRole && (
                <p className="mt-1 text-xs text-gray-500">This role is prefilled from the job you selected.</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location (City) <span className="text-black">*</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Enter your location (city)"
                className={CONTROL}
              />
            </div>
          </div>

          {/* Experience on left, Notice Period on right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience (years) <span className="text-black">*</span>
              </label>
              <input
                id="experience"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                placeholder="Enter experience (years)"
                className={CONTROL}
              />
            </div>

            <div>
              <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
                Notice Period <span className="text-black">*</span>
              </label>
              <select
                id="noticePeriod"
                name="noticePeriod"
                value={form.noticePeriod}
                onChange={handleChange}
                required
                className={CONTROL}
              >
                <option value="" disabled>Select notice period</option>
                {noticeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentCTC" className="block text-sm font-medium text-gray-700 mb-1">
                Current CTC <span className="text-black">*</span>
              </label>
              <input
                id="currentCTC"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                name="currentCTC"
                value={form.currentCTC}
                onChange={handleChange}
                required
                placeholder="Enter current CTC"
                className={CONTROL}
              />
            </div>

            <div>
              <label htmlFor="expectedCTC" className="block text-sm font-medium text-gray-700 mb-1">
                Expected CTC <span className="text-black">*</span>
              </label>
              <input
                id="expectedCTC"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                name="expectedCTC"
                value={form.expectedCTC}
                onChange={handleChange}
                required
                placeholder="Enter expected CTC"
                className={CONTROL}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio URL (optional)
              </label>
              <input
                id="portfolio"
                type="text"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="Enter your portfolio URL"
                className={CONTROL}
              />
            </div>

            <div>
              <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-1">
                Resume <span className="text-black">*</span>
              </label>
              <div>
                <input
                  ref={fileInputRef}
                  id="resumeFile"
                  type="file"
                  name="resumeFile"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={BTN}
                >
                  Choose file
                </button>
                {form.resumeFile && (
                  <p className="mt-2 text-sm text-gray-600">Selected: {form.resumeFile.name}</p>
                )}
              </div>
            </div>
          </div>

          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black disabled:opacity-50 focus:outline-none"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>

          {error && (
            <div role="alert" className="mt-3 p-4 bg-white border border-gray-300 rounded-md">
              <p className="text-black text-sm">{"❌ "}{error}</p>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

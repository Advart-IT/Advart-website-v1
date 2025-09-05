"use client"

import * as React from "react"

export default function ContactSection() {
  const [form, setForm] = React.useState({
    firstName: "",
    business: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("access_key", "18b6b803-4a45-414b-a7f1-6f462b766023") // Replace with your access key
    formData.append("firstName", form.firstName)
    formData.append("business", form.business)
    formData.append("email", form.email)
    formData.append("phone", form.phone)
    formData.append("reason", form.reason)
    formData.append("message", form.message)

    const subject = `Inquiry: ${form.reason ? form.reason : "No specific reason"}`
    formData.append("subject", subject)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("Message sent successfully!")
      } else {
        alert("Error sending message, please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error sending message, please try again.")
    }
  }

  const INPUT =
    "h-11 w-full px-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none"

  return (
    <div className="bg-[#F6F7F9] mt-24">  {/* 👈 added top margin */}
      <section className="mx-auto max-w-6xl px-4 md:px-0 py-10 md:py-14 text-black">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
          {/* Left: image */}
          <div className="relative rounded-xl md:h-[520px] h-64 overflow-hidden">
            <img
              src="/contact/boat-1.png"
              alt="Contact illustration"
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
          </div>

          {/* Right: form */}
          <div className="md:h-[520px]">
            <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
              {/* Row 1 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-black">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="Your name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className={INPUT}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="business" className="block text-sm font-medium text-black">
                    Business Name
                  </label>
                  <input
                    id="business"
                    name="business"
                    placeholder="Company / Brand"
                    value={form.business}
                    onChange={handleChange}
                    className={INPUT}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-black">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@mail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={INPUT}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-black">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 12345 67890"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className={INPUT}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <label htmlFor="reason" className="block text-sm font-medium text-black">
                  Purpose of your inquiry? <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  className={INPUT}
                >
                  <option value="">Select a reason</option>
                  <option value="branding">Branding and Strategy</option>
                  <option value="consulting">Business Consulting</option>
                  <option value="performance">Performance Marketing</option>
                  <option value="smm">Social Media Marketing</option>
                  <option value="design">Packaging and Designing</option>
                  <option value="ooh_tvc">OOH and TVC</option>
                  <option value="web">Website Development</option>
                  <option value="dot_demo">Dot Demo</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              {/* Row 4 */}
              <div className="space-y-2 flex-1 flex flex-col">
                <label htmlFor="message" className="block text-sm font-medium text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your project or question…"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="flex-1 min-h-32 resize-y w-full px-3 py-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>

              {/* Row 5 */}
              <button
                type="submit"
                className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

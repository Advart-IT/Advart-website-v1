"use client";
import { useState } from "react";

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  const INPUT =
    "h-11 w-full px-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSending(false);

    if (res.ok) {
      alert("Message sent successfully! 🎉");
      form.reset();
    } else {
      alert("Failed to send! ❌ Please try again later.");
    }
  }

  return (
    <div className="bg-[#F6F7F9] mt-24">
      <section className="mx-auto max-w-6xl px-4 md:px-0 py-0 md:py-10 text-black">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
          
          {/* LEFT SIDE — UNCHANGED */}
          <div className="bg-white rounded-xl p-8 md:h-[520px] flex flex-col justify-center shadow-sm">
            <h2 className="text-3xl font-bold text-black mb-8">
              Get in <span className="text-primary">Touch</span>
            </h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Phone</h3>
                  <a href="tel:+919600506015" className="text-gray-600 hover:underline">
                    +91 96005 06015
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1" aria-hidden="true">
                  {/* your same SVG icon */}
                   <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Email</h3>
                  <a href="mailto:digital@advartit.in" className="text-gray-600 hover:underline">
                    digital@advartit.in
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1" aria-hidden="true">
                  {/* your same SVG icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Location</h3>
                  <p className="text-gray-600">Coimbatore, Tamil Nadu</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-8 rounded-lg overflow-hidden h-40 border border-gray-200">
              <iframe
                title="Office location map"
                src="https://www.google.com/maps?q=11.0247741,76.9938307&z=15&hl=en&output=embed"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          {/* RIGHT SIDE — UPDATED FORM ONLY */}
          <div className="md:h-[520px]">
            <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
              
              {/* Row 1 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input name="firstName" placeholder="Your name" required className={INPUT} autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">Business Name</label>
                  <input name="business" placeholder="Company / Brand" className={INPUT} autoComplete="organization" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input name="email" type="email" placeholder="your@mail.com" required className={INPUT} autoComplete="email" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input name="phone" type="tel" placeholder="+91 12345 67890" required className={INPUT} autoComplete="tel" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Purpose of your inquiry? <span className="text-red-500">*</span>
                </label>
                <select name="reason" required className={INPUT} defaultValue="">
                  <option value="" disabled>Select a reason</option>
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
                <label className="block text-sm font-medium text-black">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us more about your project or question…"
                  rows={6}
                  className="flex-1 min-h-32 resize-y w-full px-3 py-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

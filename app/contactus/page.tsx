// app/contact/page.tsx
// Server Component — no "use client" needed
export default function ContactPage() {
  const INPUT =
    "h-11 w-full px-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none";

  return (
    <div className="bg-[#F6F7F9] mt-24">
      <section className="mx-auto max-w-6xl px-4 md:px-0 py-0 md:py-10 text-black">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch">
          {/* Left: Contact Information */}
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
                  <a
                    href="tel:+919600506015"
                    className="text-gray-600 hover:underline"
                  >
                    +91 96005 06015
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1" aria-hidden="true">
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
                  <a
                    href="mailto:digital@advartit.in"
                    className="text-gray-600 hover:underline"
                  >
                    digital@advartit.in
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1" aria-hidden="true">
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

            {/* Real Google Map */}
            <div
              className="mt-8 rounded-lg overflow-hidden h-40 border border-gray-200"
              style={{ contentVisibility: "auto", containIntrinsicSize: "320px" }}
            >
              <iframe
                title="Office location map"
                src="https://www.google.com/maps?q=11.0247741,76.9938307&z=15&hl=en&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:h-[520px]">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="h-full flex flex-col gap-6"
            >
              {/* Required hidden fields */}
              <input
                type="hidden"
                name="access_key"
                value="18b6b803-4a45-414b-a7f1-6f462b766023"
              />
              <input
                type="hidden"
                name="subject"
                value="New Inquiry from Contact Form"
              />
              {/* Optional redirect after submit */}
              {/* <input type="hidden" name="redirect" value="https://your-site.com/thank-you" /> */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-black"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="Your name"
                    required
                    className={INPUT}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="business"
                    className="block text-sm font-medium text-black"
                  >
                    Business Name
                  </label>
                  <input
                    id="business"
                    name="business"
                    placeholder="Company / Brand"
                    className={INPUT}
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@mail.com"
                    required
                    className={INPUT}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-black"
                  >
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 12345 67890"
                    required
                    className={INPUT}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-black"
                >
                  Purpose of your inquiry?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  name="reason"
                  required
                  className={INPUT}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
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
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your project or question…"
                  rows={6}
                  className="flex-1 min-h-32 resize-y w-full px-3 py-3 text-sm border rounded-md border-gray-300 bg-white text-black focus:outline-none"
                />
              </div>

              {/* Row 5 */}
              <button
                type="submit"
                className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border border-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

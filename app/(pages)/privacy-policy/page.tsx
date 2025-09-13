import React from "react"



export default function PrivacyPolicyPage() {

  return (
    <div className="bg-[#F6F7F9] mt-24">
      <section className="mx-auto max-w-6xl px-4 md:px-0 py-10 md:py-14 text-black">
        <div className="space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
          </header>

          <p>
            This Privacy Policy explains how <strong>Advart</strong> (“we”, “us”, “our”) collects, uses, and protects your
            information when you use our website and contact form. By using our site (<strong>advartit.in</strong>),
            you agree to this Policy.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact details:</strong> Name, Business name , Email, Phone.</li>
              <li><strong>Form details:</strong> Inquiry reason and your message.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your inquiries and provide requested services.</li>
              <li>To operate, secure, and improve our site and communications.</li>
              <li>To send administrative updates and with your consent, marketing messages (opt-out available).</li>
              <li>To comply with legal obligations and enforce our Terms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third-Party Processing</h2>
            <p>
              We use <strong>Web3Forms</strong> to process contact form submissions. When you submit the form,
              your data is securely transmitted to Web3Forms and delivered to us. We may also use hosting, analytics,
              and anti-spam providers as part of operating the site. We do not sell your data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p>
              We retain submissions as long as necessary to address your request and for legitimate business or legal purposes.
              To request earlier deletion, contact us using the details below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, update, delete, or restrict use of your personal data,
              and to withdraw consent where applicable. Contact us to exercise these rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect your information. However, no method of transmission
              or storage is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Children</h2>
            <p>
              Our services are not intended for children below the applicable age in your jurisdiction. We do not knowingly collect such data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Changes to This Policy</h2>
            <p>
              We may update this Policy from time to time. The “Effective” date above reflects the latest version.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <address className="not-italic">
              <strong>Advart</strong><br />
              Registered Address: 14/548-3, Thiyaki Kumaran Street, Punjai Puliampatti, Sathyamangalam Taluk, Erode-638459<br />
              Email: <a className="underline" href="mailto:[your@email.com]">digital@advartit.in</a><br />
              Phone: + 91 96005 06015
            </address>
          </section>
        </div>
      </section>
    </div>
  )
}

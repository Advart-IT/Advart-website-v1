// components/site-footer.tsx
// Server Component — no "use client"
import Image from "next/image";

function IconMapPin({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconPhone({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  const mapsUrl = "https://maps.app.goo.gl/HxMnU4ZNbiQFEYeeA?g_st=aw";
  const phoneDisplay = "+ 91 96005 06015";
  const phoneHref = "+919600506015";
  const email = "digital@advartit.in";

  return (
    <footer className="w-full bg-white border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* 2x2 on mobile, 4x1 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand + Description */}
          <div>
            <a href="/" className="inline-block">
              {/* Optimized logo (place /public/logo-1.png) */}
              <Image
                src="/logo-1.png"
                alt="Advart Logo"
                width={160}
                height={40}
                priority={false}
                loading="lazy"
                className="h-10 w-auto"
              />
              <p className="text-sm text-black/70">The agency for your next move.</p>
            </a>

            <div className="mt-4 text-sm text-black/70 space-y-3">
              {/* Location with Google Maps link */}
              <p className="flex items-start gap-2">
                <IconMapPin className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  aria-label="Open location in Google Maps"
                >
                  105/101, Bharathi Colony Rd,<br />
                  Peelamedu, Coimbatore - 641004
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/aboutus" className="text-black/70 hover:text-black transition-colors">About</a></li>
              {/* <li><a href="/careers" className="text-black/70 hover:text-black transition-colors">Careers</a></li> */}
              <li><a href="/contactus" className="text-black/70 hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-black mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="text-black/70 hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="text-black/70 hover:text-black transition-colors">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-black mb-3">Contact</h3>
            <div className="space-y-3 text-sm text-black/70">
              {/* Phone */}
              <p className="flex items-center gap-2">
                <IconPhone className="w-5 h-5 text-black flex-shrink-0" />
                <a href={`tel:${phoneHref}`} className="hover:underline" aria-label={`Call ${phoneDisplay}`}>
                  {phoneDisplay}
                </a>
              </p>

              {/* Email */}
              <p className="flex items-center gap-2">
                <IconMail className="w-5 h-5 text-black flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline" aria-label={`Email ${email}`}>
                  {email}
                </a>
              </p>

              {/* LinkedIn */}
              <p>
                <a
                  href="https://www.linkedin.com/company/advarttechnologies/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M20.447 20.452H16.893V14.89c0-1.327-.027-3.037-1.85-3.037-1.853 0-2.137 1.445-2.137 2.939v5.66H9.354V9h3.41v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a1.987 1.987 0 1 1 0-3.975 1.987 1.987 0 0 1 0 3.975ZM6.777 20.452H3.896V9h2.881v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  </svg>
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 text-center border-t border-black/10 pt-6">
          <p className="text-xs text-black/70">© {year} Advart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

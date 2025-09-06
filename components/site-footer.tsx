import { MapPin, Phone } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()

  const mapsUrl = "https://maps.app.goo.gl/HxMnU4ZNbiQFEYeeA?g_st=aw"
  const phoneDisplay = "+ 91 96005 06015"
  const phoneHref = "+91  9600506015"

  return (
    <footer className="w-full bg-white border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand + Description */}
          <div>
            <a href="/" className="inline-block">
              <span className="text-2xl font-bold text-black">
                Advart.
              </span>
            </a>
            <p className="mt-2 text-sm text-black/70">
              The agency for your next move.
            </p>

            <div className="mt-4 text-sm text-black/70 space-y-3">
              {/* Location with Google Maps link */}
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
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

              {/* Phone */}
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-black flex-shrink-0" />
                <a
                  href={`tel:${phoneHref}`}
                  className="hover:underline"
                  aria-label={`Call ${phoneDisplay}`}
                >
                  {phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-black/70 hover:text-black transition-colors">Home</a></li>
              <li><a href="/aboutus" className="text-black/70 hover:text-black transition-colors">About</a></li>
              <li><a href="/careers" className="text-black/70 hover:text-black transition-colors">Careers</a></li>
              <li><a href="/contactus" className="text-black/70 hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-black mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="text-black/70 hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="text-black/70 hover:text-black transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-black mb-3">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/advarttechnologies/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-[#0A66C2]" fill="currentColor">
                  <path d="M20.447 20.452H16.893V14.89c0-1.327-.027-3.037-1.85-3.037-1.853 0-2.137 1.445-2.137 2.939v5.66H9.354V9h3.41v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a1.987 1.987 0 1 1 0-3.975 1.987 1.987 0 0 1 0 3.975ZM6.777 20.452H3.896V9h2.881v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 text-center border-t border-black/10 pt-6">
          <p className="text-xs text-black/70">
            © {year} Advart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

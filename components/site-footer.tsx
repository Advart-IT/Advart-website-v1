export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200/20 dark:border-gray-800/20 rounded-2xl shadow-lg shadow-black/5 px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <a href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Advart</span>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400">The agency for your next move.</p>

            {/* Address & Phone */}
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                📍{" "}
                <a
                  href="https://www.google.com/maps/place/Your+Office+Address+Here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  123 Business Street, City, Country
                </a>
              </p>
              <p>
                📞{" "}
                <a
                  href="tel:+1234567890"
                  className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  +1 234 567 890
                </a>
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href="/home"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              About Us
            </a>
            <a
              href="/services"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Careers
            </a>
            <a
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/advarttechnologies/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#0A66C2]"
                fill="currentColor"
              >
                <path d="M20.447 20.452H16.893V14.89c0-1.327-.027-3.037-1.85-3.037-1.853 0-2.137 1.445-2.137 2.939v5.66H9.354V9h3.41v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a1.987 1.987 0 1 1 0-3.975 1.987 1.987 0 0 1 0 3.975ZM6.777 20.452H3.896V9h2.881v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-500">© {year} Advart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="/privacy"
              className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

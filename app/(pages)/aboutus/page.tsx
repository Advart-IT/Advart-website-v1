"use client"

function VideoInline({ src }: { src: string }) {
  return (
    <div className="relative w-full h-auto overflow-hidden rounded-2xl">
      <video
        src={src}
        muted
        loop
        autoPlay
        playsInline
        className="w-full h-auto object-contain"
      />
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-black">
      <div>
        {/* HERO SECTION */}
        <section className="mb-12 md:mb-16">
          {/* Full-bleed hero image */}
          <div className="relative rounded-none md:rounded-2xl mb-8 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Creative team collaboration in black and white"
              className="w-full h-64 md:h-80 object-cover filter grayscale brightness-110 contrast-125"
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-4 sm:px-6 md:px-8 text-center">
                <h1 className="font-bold leading-tight text-2xl sm:text-3xl md:text-4xl">
                  <span className="text-[#ffdc38]">Agency</span>{" "}
                  <span className="text-white">
                    that creates the best of marketing talents!
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Content container with mobile padding */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  And the love for <span className="text-[#000000]">art</span> brought us here…
                </h2>

                <div className="space-y-3 text-base text-gray-600">
                  <p>
                    We come from the land where they say "Vaanga Poonga", the most
                    respectful city in Tamil Nadu, Coimbatore. Our team, drawn from
                    across India, speaks the language of data, strategy and growth,
                    which translates into creative impact!
                  </p>
                  <p>
                    We happily take on projects across packaging, design, social media
                    marketing, performance marketing, business consulting... Anything
                    your brand needs, our team knows exactly what to do!
                  </p>
                </div>
              </div>

              {/* Lighthouse hidden on mobile, visible only on lg+ */}
              <div className="lg:col-span-5 flex lg:justify-end">
                <img
                  src="/aboutus/lighthouse.webp"
                  alt="Lighthouse illustration"
                  className="hidden lg:block w-full max-w-[360px] md:max-w-[420px] object-contain p-4 lg:p-6 mx-auto lg:mx-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="mb-8 md:mb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Meet the <span className="text-[#000000]">Team</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Who's going to be working on your brand's growth.
            </p>

            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                We are a mix of seasoned specialists and young creatives from all
                kinds of backgrounds, with years of marketing experience and a knack
                for knowing what works. No hierarchy here—everyone gets involved in
                every project to create content that's on-trend, consistent and truly
                sounds like your brand.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/aboutus/team.webp"
                alt="Our Creative Team"
                className="w-full h-auto object-cover filter grayscale"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

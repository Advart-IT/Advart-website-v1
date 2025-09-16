"use client"

export default function AboutPage() {
  return (
    <div className="min-h-screen section text-black">
      <div>
        {/* HERO SECTION */}
        <section className="section">
          {/* Full-bleed hero image */}
          <div className="relative rounded-none md:rounded-2xl mb-8 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Creative team collaboration"
              className="w-full max-w-md h-48 md:h-64 object-cover mx-auto"
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
                <h1 className="heading1 mt-10 ">
                  <span className="text-primary">Agency</span>{" "}
                  <span className="text-white">
                    that creates the best of marketing talents!
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Content container: full 6xl width */}
          <div className="section-container pt-0">
            <div className="max-w-6xl mx-auto lg:text-center">
              <div className="flex flex-col justify-center space-y-3 md:space-y-4">
                <h2 className="heading1 pb-0 font-semibold">
                  And the love for <span className="text-primary">art</span>{" "}
                  brought us here…
                </h2>

                <div className="space-y-3">
                  <p className="paragraph max-w-none">
                    We come from the land where they say &quot;Vaanga Poonga&quot;, the most respectful city in Tamil Nadu, Coimbatore. Our team,
                    drawn from across India, speaks the language of data, strategy and growth, which translates into creative impact!
                  </p>
                  <p className="paragraph max-w-none">
                    We happily take on projects across packaging, design, social media marketing, performance marketing, business consulting...
                    Anything your brand needs, our team knows exactly what to do!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section
          className="section"
          style={{ contentVisibility: "auto", containIntrinsicSize: "700px" }}
        >
          <div className="section-container pt-0">
            <div className="max-w-6xl mx-auto lg:text-center">
              <h2 className="heading1 pb-0">
                Meet the <span className="text-primary">Team</span>
              </h2>

              <p className="paragraph fs-fluid-16-18 max-w-none">
                Who's going to be working on your brand&apos;s growth.
              </p>

              <div className="mb-8">
                <p className="paragraph max-w-none">
                  We are a mix of seasoned specialists and young creatives from all kinds of backgrounds, with years of marketing experience and a
                  knack for knowing what works. No hierarchy here—everyone gets involved in every project to create content that&apos;s on-trend,
                  consistent and truly sounds like your brand.
                </p>
              </div>

              
                <img
                  src="/aboutus/team-2.webp"
                  alt="Our Creative Team"
                  loading="lazy"
                  decoding="async"
                />
          
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

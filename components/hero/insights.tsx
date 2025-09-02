"use client"

type Insight = {
  icon: string
  text: string
  description: string
}

export default function Insights() {
  const insights: Insight[] = [
    { icon: "/hero/insights/bar.svg",           text: "20x Revenue Growth", description: "Scaled an e-commerce business from 5x sales to 20x." },
    { icon: "/hero/insights/ranking.svg",       text: "231k Followers",     description: "Grew from 1K to 231k followers in record time." },
    { icon: "/hero/insights/net-butterfly.svg", text: "3M Views",           description: "Generated over 3 million reel views organically." },
    { icon: "/hero/insights/paper.svg",         text: "Category Expansion", description: "Consulted an e-commerce brand to scale from 2 to 25 product categories" },
  ]

  return (
    /* === Same outer rhythm as Hero/Services (no animations) === */
    <section id="insights" className="scroll-mt-24 md:scroll-mt-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14">
        <div className="bg-[#F6F7F9] text-black rounded-2xl">
          <div className="max-w-6xl w-full mx-auto">
            {/* Desktop / Large screens (no sticky, no min-h-screen) */}
            <div className="hidden lg:grid lg:grid-cols-2 items-center gap-12 xl:gap-16   ">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4 leading-tight">
                  Based on <span className="font-semibold">True Impact</span>
                </h2>
                <div className="relative w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img
                    src="/hero/insights/nc-ranking.png"
                    alt="Insights hero"
                    className="w-64 md:w-80 h-auto object-contain pt-4"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 xl:gap-6">
                {insights.map((item, i) => (
                  <div key={i} className="group rounded-2xl border border-black/10 bg-white p-6 xl:p-8 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white">
                        <img src={item.icon || "/placeholder.svg"} alt="" className="h-10 w-10 object-contain" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg md:text-xl font-medium">{item.text}</h3>
                        <p className="leading-relaxed text-black/70">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile / Tablet (simple grid, no auto-scroll) */}
            <div className="lg:hidden p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-light">
                  Based on <span className="font-semibold">Impact</span>
                </h2>
                <div className="relative mx-auto mt-4 mb-6 w-full overflow-hidden rounded-2xl grid place-items-center">
                  <img
                    src="/hero/insights/nc-ranking.png"
                    alt="Insights hero"
                    className="w-48 sm:w-56 h-auto object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {insights.map((item, i) => (
                  <div key={i} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex flex-col items-center text-center">
                      <img src={item.icon || "/placeholder.svg"} alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-2" aria-hidden="true" />
                      <span className="text-sm sm:text-base font-medium">{item.text}</span>
                      <p className="text-xs sm:text-sm text-black/70 mt-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* max-w-6xl */}
        </div>{/* panel */}
      </div>{/* container */}
    </section>
  )
}

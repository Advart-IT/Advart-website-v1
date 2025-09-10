"use client"

import React, { useState, useEffect } from "react"

type Card = {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  whatTried: string[]
  result: string
}

const MultiViewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const cards: Card[] = [
    {
      imageSrc: "hero/brand/bee-little.webp",
      title: "Beelittle",
      description:
        "10 YEARS OF BEELITTLE (A 4 yrs partnership we proudly celebrate) Beelittle turned 10, and we knew the celebration had to feel just as special as the journey. So, we went above and beyond to make this milestone a part of every tiny one's home.",
      whatTried: [
        "30-Day Strong Digital Campaign",
        "Private Screening & Celebration for Followers",
        "Custom Storybook",
      ],
      result:
        "A celebration that brought in strong community engagement, built deeper trust and skyrocketed brand awareness… all of which positively reflected in sales.",
    },
    {
      imageSrc: "/hero/brand/zing.webp",
      title: "Zing",
      description:
        "A homegrown kurta brand that feels like home to us... because we built it from scratch, turning failures into lessons and growth into success.",
      whatTried: [
        "Almost everything...",
        "From consulting to strategy.",
        "Production to post-production...",
        "Everything it takes to make a brand stand tall.",
        "We tested and tried it all with Zing.",
      ],
      result:
        "The business that began with just ₹30k has now grown into a turnover of ₹3 crore.",
    },
    {
      imageSrc: "hero/brand/prathiksham.webp",
      title: "Prathiksham",
      description:
        "A well-known homegrown designer with 15 years of experience wanted to launch her own brand. She came to us with a dream and together, we made it real.",
      whatTried: ["Business Consulting", "Branding & Website Presence", "Social Media Presence"],
      result:
        "Her kurta line is now a go-to in every working woman's wardrobe. Sales have peaked and the label has grown into a name that many proudly recognise.",
    },
  ]

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const getVisibleCards = () => {
    const visibleCards: { card: Card; index: number; position: number }[] = []
    const totalCards = cards.length
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalCards) % totalCards
      visibleCards.push({ card: cards[index], index, position: i })
    }
    return visibleCards
  }

  return (
    <div className="relative w-full py-4 bg-black">
      {/* Cards Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center px-4 py-6">
          <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6">
            {getVisibleCards().map(({ card, index, position }) => (
              <div
                key={index}
                className={`relative cursor-pointer transition-all duration-500 ease-out transform ${
                  position === 0 ? "scale-105 z-20" : "scale-90 z-10"
                }`}
                onClick={() => goToSlide(index)}
              >
                <div
                  className={`rounded-2xl overflow-hidden text-white relative bg-black border border-white/10 ${
                    position === 0
                      ? "w-72 sm:w-80 lg:w-96 h-[28rem] sm:h-[30rem] lg:h-[32rem]"
                      : "w-64 sm:w-72 lg:w-80 h-[24rem] sm:h-[26rem] lg:h-[28rem]"
                  }`}
                >
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 lg:p-5">
                    {/* Image */}
                    <div className="flex justify-center mb-3">
                      <div
                        className={`rounded-xl overflow-hidden bg-black ${
                          position === 0 ? "w-40 h-40 sm:w-48 sm:h-48" : "w-32 h-32 sm:w-40 sm:h-40"
                        }`}
                      >
                        <img
                          src={card.imageSrc}
                          alt={card.imageAlt ?? `${card.title} showcase`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 space-y-2 sm:space-y-3">
                      <div>
                        <h1
                          className={`font-light leading-tight mb-2 ${
                            position === 0 ? "text-lg sm:text-xl lg:text-2xl" : "text-base sm:text-lg lg:text-xl"
                          }`}
                        >
                          {card.title}
                        </h1>
                        <p
                          className={`font-light leading-relaxed text-gray-100 ${
                            position === 0 ? "text-xs sm:text-sm" : "text-xs line-clamp-3"
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>

                      {position === 0 && (
                        <>
                          <div className="space-y-2">
                            <h3 className="text-xs sm:text-sm font-medium text-white">What did we try?</h3>
                            <ul className="space-y-1 text-gray-200">
                              {card.whatTried.slice(0, 3).map((item, idx) => (
                                <li key={idx} className="flex items-start text-xs">
                                  <span className="text-white mr-2 mt-1 flex-shrink-0">•</span>
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* 🔥 Removed navigation arrows here */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdvartSection() {
  return (
    <section
      id="advart"
      className="section scroll-mt-24 md:scroll-mt-32 md:hidden bg-black text-white" // mobile-only, black bg
    >
      <div className="section-container pb-0">
        <div className="flex flex-col items-center justify-center">
          {/* Top copy */}
          <section className="w-full mb-6">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="heading2 pb-1">
                All exciting things we do at <span className="font-semibold">Advart...</span>
              </h2>
              <p className="paragraph mx-auto text-center whitespace-pre-line text-gray-200">
                From scaling a brand from ₹30K to ₹3Cr, to building a homegrown brand like Zing, to creating many more
                meaningful brand stories… We love doing it all, while nailing it right!
              </p>
            </div>
          </section>

          {/* Multi-view Slider */}
          <div className="w-full">
            <MultiViewSlider />
          </div>
        </div>
      </div>
    </section>
  )
}

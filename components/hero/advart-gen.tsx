
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
// Local images — upload to public/advart-gen/
const styles = [
  {
    name: "Catalogue",
    before: "/advart-gen/catalogue/before.jpg",
    after: "/advart-gen/catalogue/after.png",
  },
  {
    name: "Ghost Mannequin",
    before: "/advart-gen/ghost-mannequin/before.png",
    after: "/advart-gen/ghost-mannequin/after.png",
  },
  {
    name: "On-Model",
    before: "/advart-gen/model/before.jpg",
    after: "/advart-gen/model/after.png",
  },
  {
    name: "Lifestyle",
    before: "/advart-gen/lifestyle/before.png",
    after: "/advart-gen/lifestyle/after.png",
  },
  {
    name: "Product Styling",
    before: "/advart-gen/product-styling/before.jpg",
    after: "/advart-gen/product-styling/after.png",
  },
  {
    name: "Flat Lay",
    before: "/advart-gen/flatlay/before.jpg",
    after: "/advart-gen/flatlay/after.png",
  },
];
export default function AdvartGen({
  dedicated = false,
}: {
  dedicated?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const Heading = dedicated ? "h1" : "h2";
  const activeStyle = styles[selected];
  return (
    <section
      id="advart-gen"
      aria-labelledby="advart-gen-heading"
      className="scroll-mt-24 overflow-hidden bg-[#F6F7F9] py-12 text-black sm:py-16 lg:py-20"
    >
      <div className="section-container">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — UNCHANGED */}
          <div className="flex min-w-0 flex-col justify-center py-4 lg:py-8">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black/55">
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4 text-[#C49F00]"
              />
              Introducing Advart Gen
            </p>
            <Heading
              id="advart-gen-heading"
              className="max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.6rem]"
            >
              From Phone Photos to Production-Ready Visuals.
            </Heading>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-black/65 sm:text-lg">
              Our AI-powered image production tool transforms
              simple product photos into professional ecommerce
              visuals. Turn everyday product photos into
              high-quality visuals, ready for your ecommerce
              store, marketplaces and campaigns.
            </p>
            {/* CTA BUTTONS */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/AdvartGen/gallery"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/15 bg-transparent px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                View Gallery
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
              <Link
                href={dedicated ? "/contactus" : "/AdvartGen"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Start Free Trial
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </div>
          </div>
          {/* RIGHT — BEFORE / AFTER PREVIEW */}
          <div className="flex min-w-0 flex-col rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm sm:p-5 lg:h-[440px] lg:min-h-0 lg:self-center">
            {/* IMAGE COMPARISON */}
            <div
              id="gen-style-preview"
              className="grid min-h-0 min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:flex-1"
            >
              {/* BEFORE */}
              <figure className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-[#F5D7D4] bg-[#FFF1F0]">
                <div className="relative aspect-[3/4] w-full min-w-0 overflow-hidden bg-[#FFF1F0] lg:aspect-auto lg:min-h-0 lg:flex-1">
                  <Image
                    key={activeStyle.before}
                    src={activeStyle.before}
                    alt={`Original product photo before ${activeStyle.name} transformation`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 45vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="flex h-10 shrink-0 items-center justify-center border-t border-[#F5D7D4] bg-[#FFF1F0] px-3 text-xs font-semibold tracking-wide text-[#B42318]">
                  Before
                </figcaption>
              </figure>
              {/* AFTER */}
              <figure className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-[#C8EBD5] bg-[#ECFDF3]">
                <div className="relative aspect-[3/4] w-full min-w-0 overflow-hidden bg-[#ECFDF3] lg:aspect-auto lg:min-h-0 lg:flex-1">
                  <Image
                    key={activeStyle.after}
                    src={activeStyle.after}
                    alt={`${activeStyle.name} visual generated with Advart Gen`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 45vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="flex h-10 shrink-0 items-center justify-center border-t border-[#C8EBD5] bg-[#ECFDF3] px-3 text-xs font-semibold tracking-wide text-[#067647]">
                  After
                </figcaption>
              </figure>
            </div>
            {/* STYLE SELECTOR */}
            <div className="shrink-0 pt-4">
              <p className="mb-3 text-center text-xs font-medium text-black/55">
                Choose how your product should be presented
              </p>
              <div
                className="flex flex-wrap justify-center gap-2"
                role="group"
                aria-label="Choose a visual style"
              >
                {styles.map((style, index) => (
                  <button
                    key={style.name}
                    type="button"
                    aria-pressed={selected === index}
                    aria-controls="gen-style-preview"
                    onClick={() => setSelected(index)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none ${
                      selected === index
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-black hover:bg-black/5"
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

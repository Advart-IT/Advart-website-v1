import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LusionHero() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const beeRef = useRef<SVGGElement | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const bee = beeRef.current;
    if (!wrap || !path || !bee) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let length = path.getTotalLength();

    if (reduceMotion) {
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      bee.setAttribute("opacity", "0");
      return;
    }

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const moveBee = (progress: number) => {
      const p = Math.min(1, Math.max(0, progress));
      const dist = p * length;

      const pt = path.getPointAtLength(dist);
      const next = path.getPointAtLength(dist + 1);
      const angle = Math.atan2(next.y - pt.y, next.x - pt.x) * (180 / Math.PI);

      bee.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
    };

    moveBee(0);

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 1,
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.6,
        onUpdate: (self) => moveBee(self.progress),
        onRefresh: () => {
          length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          moveBee(ScrollTrigger.getAll().find((s) => s.trigger === wrap)?.progress ?? 0);
        },
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <div className="bg-white w-full overflow-x-hidden py-10">
      <div ref={wrapRef} className="w-full relative">

        {/* SVG */}
        <svg
          width="100%"
          height="320"
          viewBox="0 0 1440 314"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            ref={pathRef}
            d="M-74 49.6573C-74 49.6573 19.8488 -77.5303 232 92.6573C277.5 129.157 386.5 230.657 301 293.157C249.91 330.504 124.751 303.437 124 240.157C123.51 198.901 165 188.157 209 174.657C287.403 150.602 337.053 171.44 419 174.657C640.849 183.366 760.882 232.242 981.5 257.157C1139.09 274.955 1227.47 288.664 1386 293.157C1460.37 295.265 1576.5 293.157 1576.5 293.157"
            stroke="#348FB7"
            strokeWidth="8"
            strokeDasharray="20 20"
            fill="none"
            strokeLinecap="round"
          />

          <g ref={beeRef}>
            <image
              href="/beelittle/beee-01.svg"
              x={-40}
              y={-40}
              width={80}
              height={80}
            />
          </g>
        </svg>

        {/* Video */}
        <div
          className="
            absolute 
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[90vw] max-w-[420px]
            h-[200px] md:h-[240px]
            rounded-2xl overflow-hidden shadow-xl
            flex items-center justify-center
            group
          "
        >
          <video
            src="/beelittle/wa.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />

          {/* View More Overlay */}
          <div
            className="
              absolute inset-0 bg-black/40 
              opacity-100 
              md:opacity-0 md:group-hover:opacity-100
              transition-all duration-300
              flex items-end justify-center p-4
            "
          >
            <button
              onClick={() => setOpen(true)}
              className="
                text-white bg-[#348FB7]
                px-4 py-2 rounded-lg
                text-sm font-medium
                hover:bg-[#25799a]
              "
            >
              View More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="
            fixed top-0 left-0 w-full h-full 
            bg-black/40 backdrop-blur-sm
            flex justify-center
            animate-[fadeIn_0.3s_ease]
            z-[9999]
            pt-5
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="
              w-[90vw] max-w-md bg-white 
              rounded-b-2xl shadow-2xl p-5
              animate-[slideDown_0.35s_ease]
              max-h-[55vh] overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-[#348FB7]">
              Event Highlights
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <img src="/beelittle/sample1.jpg" className="rounded-lg" />
              <img src="/beelittle/sample2.jpg" className="rounded-lg" />

              <div className="col-span-2">
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fusce posuere lectus sit amet nibh faucibus, a dictum tellus gravida.
                </p>
              </div>
            </div>

            {/* Rolling Close Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setOpen(false)}
                className="
                  flex items-center gap-2 px-5 py-2
                  bg-[#348FB7] text-white rounded-full
                  hover:bg-[#25799a]
                  transition-all
                  animate-[rollIn_0.5s_ease]
                "
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

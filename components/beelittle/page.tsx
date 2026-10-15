"use client";
import LusionBeePath from "./ten-years";
import BeeLittle from "./main";
import CurvedArc from "./socialmedia";
import SocialArcReels from "./SocialScroll";
import BeePhotoShoot from "./bee-photo";

export default function Page() {
  return (
    <main className="bg-white text-black">

      {/* SECTION 1 */}
      <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-20 min-h-screen flex justify-center items-center">
        <div className="max-w-7xl w-full mx-auto">
          <BeeLittle />
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-20 flex justify-center">
        <div className="max-w-7xl w-full mx-auto">
          <CurvedArc
            imageUrls={[
              "/beelittle/socialmedia-1.jpeg",
              "/beelittle/socialmedia-2.jpeg",
              "/beelittle/socialmedia-3.jpeg",
              "/beelittle/socialmedia-4.jpeg",
            ]}
          />
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-20 flex justify-center">
        <div className="max-w-7xl w-full mx-auto">
          <SocialArcReels
            videoUrls={[
              "/beelittle/bee-reel-1.mp4",
              "/beelittle/bee-reel-1.mp4",
              "/beelittle/bee-reel-1.mp4",
              "/beelittle/bee-reel-1.mp4",
              "/beelittle/bee-reel-1.mp4",
            ]}
          />
        </div>
      </section>

      {/* SECTION 4 — Bee SVG Animation */}
      <section className="px-0 sm:px-0 md:px-0 py-10 sm:py-14 md:py-20">
        <div className="max-w-full mx-auto w-full">
          <LusionBeePath />
        </div>
      </section>

      {/* SECTION 5 — PhotoShoot */}
      <section className="px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <BeePhotoShoot
            topImages={[
              "/beelittle/socialmedia-1.jpeg",
              "/beelittle/socialmedia-1.jpeg",
              "/beelittle/socialmedia-1.jpeg",
              "/beelittle/socialmedia-1.jpeg",
              "/beelittle/socialmedia-1.jpeg",
              "/beelittle/socialmedia-1.jpeg",
            ]}
            bottomBanner="/beelittle/socialmedia-1.jpeg"
          />
        </div>
      </section>

    </main>
  );
}

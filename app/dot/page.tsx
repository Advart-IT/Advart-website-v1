"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


function resolveAsset(path: string, basePath = "") {
  // Ensure exactly one slash between basePath and path
  if (basePath && basePath !== "/") {
    return `${basePath.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }
  return path;
}

function useVideoSrc(srcWebm: string, srcMp4?: string) {
  const [chosen, setChosen] = useState(srcWebm);

  useEffect(() => {
    const v = document.createElement("video");
    const canWebm = !!v.canPlayType && v.canPlayType("video/webm; codecs=vp9,vorbis") !== "";
    if (canWebm) {
      setChosen(srcWebm);
    } else if (srcMp4) {
      setChosen(srcMp4);
    } else {
      setChosen(srcWebm); // fallback to whatever we have
    }
  }, [srcWebm, srcMp4]);

  return chosen;
}

function VideoInline({
  srcWebm,
  srcMp4,
  onExpand,
  label,
  poster,
}: {
  srcWebm: string;
  srcMp4?: string;
  onExpand: () => void;
  label: string;
  poster?: string;
}) {
  const chosen = useVideoSrc(srcWebm, srcMp4);

  return (
    <div className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 bg-white/50 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg w-full h-full">
      <div className="relative w-full h-[52vw] max-h-[420px] lg:h-[420px] overflow-hidden rounded-lg">
        <video
          key={chosen}           // ensures re-render when source changes
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          poster={poster}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={srcWebm} type="video/webm" />
          {srcMp4 ? <source src={srcMp4} type="video/mp4" /> : null}
        </video>

        <button
          type="button"
          onClick={onExpand}
          className="absolute inset-0 flex items-center justify-center focus:outline-none group/play bg-black/10 hover:bg-black/20 transition-all duration-300"
          aria-label={`Play ${label}`}
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-20 w-20 rounded-full bg-black/20 animate-ping group-hover/play:bg-black/30" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-black/90 text-white backdrop-blur-sm hover:bg-white hover:text-black border border-black transition-all duration-300 shadow-2xl">
              <Play className="w-8 h-8 translate-x-[2px]" />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function DotPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const router = useRouter();

  // If you deploy under a subpath (Next.js basePath), expose it via env:
  // e.g. NEXT_PUBLIC_BASE_PATH="/your-subsite"
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowVideo(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openVideo = (src: string) => {
    setVideoSrc(src);
    setShowVideo(true);
  };
  const closeVideo = () => setShowVideo(false);

  // Match your folder: public/dot/dot-*.webm (and optional mp4 fallbacks)
  const socialWEBM = resolveAsset("/dot/dot-social.webm", basePath);
  const socialMP4  = resolveAsset("/dot/dot-social.mp4", basePath); // add this file for Safari
  const dataWEBM   = resolveAsset("/dot/dot-data1.webm", basePath);
  const dataMP4    = resolveAsset("/dot/dot-data1.mp4", basePath);   // add this file for Safari

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-black py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero */}
        <section className="text-center mb-16 md:mb-24">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-11">
              Do It With <span className="text-[#ffdc38]">DOT</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Made for Agencies & Businesses that value <span className="font-semibold">Clarity</span> over Confusion
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black shadow-sm focus:outline-none text-lg font-medium"
              onClick={() => openVideo(socialWEBM)}
            >
              Book a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Video */}
              <div className="lg:col-span-7">
                <VideoInline
                  srcWebm={socialWEBM}
                  srcMp4={socialMP4}
                  onExpand={() => openVideo(socialWEBM)}
                  label="Dot Social Media"
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Dot <span className="text-[#ffdc38]">Social Media</span>
                  </h2>
                </div>

                <p className="text-lg">
                  Promoting a clutter-free workspace because happy employees drive better growth!
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <p className="text-gray-600">
                      We've seen both large organisations and small startups struggle with organising work,
                      where missed deadlines and lack of direction become a nightmare.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-gray-600">
                      <span className="font-semibold text-black">Guess what? DOT fixes it.</span>
                      <br />
                      Whether it's assigning tasks or tracking progress, everything happens in one place…
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-lg font-semibold text-black">
                    With DOT, never miss a task or an update.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Content */}
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Dot <span className="text-[#ffdc38]">Data</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="text-lg">
                    Advanced analytics and insights to power your business decisions.
                  </p>
                  <div>
                    <p className="text-black font-semibold text-center">Coming Soon...</p>
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <VideoInline
                  srcWebm={dataWEBM}
                  srcMp4={dataMP4}
                  onExpand={() => openVideo(dataWEBM)}
                  label="Dot Data"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fullscreen Modal */}
      {showVideo && videoSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white/80 hover:text-white focus:outline-none transition-colors duration-200 p-2"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>

            <video autoPlay controls className="w-full h-full rounded-lg bg-black shadow-2xl">
              <source src={videoSrc} type="video/webm" />
              {/* Fallback if user clicked WEBM on a Safari device */}
              {videoSrc.includes("dot-social") && <source src={socialMP4} type="video/mp4" />}
              {videoSrc.includes("dot-data1") && <source src={dataMP4} type="video/mp4" />}
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

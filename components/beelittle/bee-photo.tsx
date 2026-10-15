"use client";
import React from "react";

interface BeePhotoShootProps {
  topImages: string[];
  bottomBanner: string;
}

export default function BeePhotoShoot({ topImages, bottomBanner }: BeePhotoShootProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">

        <div className="grid grid-cols-3 gap-3 mb-4">
          {topImages.map((src, i) => (
            <div key={i} className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded">
              <img src={src} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded">
          <img src={bottomBanner} className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
}

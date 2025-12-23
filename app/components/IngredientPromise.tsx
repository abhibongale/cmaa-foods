"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "../data/siteConfig";

interface Hotspot {
  id: string;
  label: string;
  description?: string;
  top: string; // Percentage from top
  left: string; // Percentage from left
}

interface IngredientPromiseProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
}

export default function IngredientPromise({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  hotspots,
}: IngredientPromiseProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden h-full">
      <div className="p-6 md:p-8">
        {/* Interactive Image with Hotspots */}
        <div className="relative w-full aspect-square bg-[#F5E6D3] rounded-xl overflow-hidden shadow-lg group">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />

        {/* Hotspots */}
        {hotspots.map((hotspot) => {
          const isActive = activeHotspot === hotspot.id;
          return (
            <div
              key={hotspot.id}
              className="absolute flex items-center group/spot"
              style={{
                top: hotspot.top,
                left: hotspot.left,
              }}
              onMouseEnter={() => setActiveHotspot(hotspot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Pulsing Circle */}
              <div
                className={`w-4 h-4 bg-white rounded-full border-2 border-[#8B4513] relative cursor-pointer z-10 transition-all ${
                  isActive ? "scale-125" : ""
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                )}
              </div>

              {/* Tooltip */}
              <div
                className={`ml-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-[-10px] pointer-events-none"
                }`}
              >
                <div className="text-[#8B4513] font-bold">{hotspot.label}</div>
                {hotspot.description && (
                  <div className="text-xs text-gray-600 mt-1">{hotspot.description}</div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}


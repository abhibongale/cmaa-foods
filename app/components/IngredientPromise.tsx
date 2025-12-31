"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Hotspot {
  id: string;
  label: string;
  description?: string;
  top: string; // Percentage from top
  left: string; // Percentage from left
}

interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
}

interface IngredientPromiseProps {
  products: Product[];
  defaultProductId?: string;
}

export default function IngredientPromise({
  products,
  defaultProductId,
}: IngredientPromiseProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(
    defaultProductId || products[0]?.id
  );
  const [imageTransform, setImageTransform] = useState({ rotateX: 0, rotateY: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Handle 3D movement on hotspot hover - 100 degree rotation
  const handleHotspotMouseEnter = useCallback(() => {
    // Rotate 100 degrees on Y-axis
    setImageTransform({ rotateX: 0, rotateY: 100 });
  }, []);

  const handleHotspotMouseLeave = useCallback(() => {
    // Reset to 0 degrees
    setImageTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden h-full">
      <div className="p-6 md:p-8">
        {/* Product Selector */}
        {products.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg border-2 transition-all duration-300 font-medium text-xs md:text-sm ${
                  selectedProductId === product.id
                    ? "bg-[#8B4513] text-white border-[#8B4513]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#8B4513] hover:text-[#8B4513]"
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        )}

        {/* Interactive Image with Hotspots */}
        <div 
          ref={imageContainerRef}
          className="relative w-full aspect-square bg-[#F5E6D3] rounded-xl overflow-hidden shadow-lg group"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-[1500ms] ease-in-out"
            style={{
              transform: `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={selectedProduct.imageSrc}
              alt={selectedProduct.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Hotspots */}
          {selectedProduct.hotspots.map((hotspot) => {
            const isActive = activeHotspot === hotspot.id;
            return (
              <div
                key={hotspot.id}
                className="absolute flex items-center group/spot"
                style={{
                  top: hotspot.top,
                  left: hotspot.left,
                }}
                onMouseEnter={() => {
                  setActiveHotspot(hotspot.id);
                  handleHotspotMouseEnter();
                }}
                onMouseLeave={() => {
                  setActiveHotspot(null);
                  handleHotspotMouseLeave();
                }}
              >
                {/* Pulsing Circle */}
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border-2 border-[#8B4513] relative cursor-pointer z-10 transition-all ${
                    isActive ? "scale-125" : ""
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Tooltip */}
                <div
                  className={`ml-3 bg-white/95 backdrop-blur-sm px-4 py-2 md:px-5 md:py-3 rounded-lg text-sm md:text-base font-semibold shadow-lg whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-[-10px] pointer-events-none"
                  }`}
                >
                  <div className="text-[#8B4513] font-bold text-base md:text-lg">{hotspot.label}</div>
                  {hotspot.description && (
                    <div className="text-xs md:text-sm text-gray-600 mt-1">
                      {hotspot.description}
                    </div>
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

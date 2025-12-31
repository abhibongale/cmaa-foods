"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface ParallaxBackgroundProps {
  imageSrc: string;
  imageAlt?: string;
  speed?: number; // Parallax speed (0-1, where 0.5 is half speed)
  opacity?: number; // Background opacity
  scale?: number; // Image scale (default: 1, use 0.5 for half size, etc.)
}

export default function ParallaxBackground({
  imageSrc,
  imageAlt = "Background",
  speed = 0.3,
  opacity = 0.08,
  scale = 0.6, // Default to 60% size
}: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div
        className="absolute inset-0 w-full h-[200%] flex items-center justify-center"
        style={{
          transform: `translateY(${scrollY * speed}px)`,
          opacity: opacity,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            position: 'relative',
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            quality={75}
            priority={false}
            sizes="100vw"
            unoptimized={false}
          />
        </div>
      </div>
    </div>
  );
}


"use client";

import Image from "next/image";
import { siteConfig } from "../data/siteConfig";
import HeroVideo from "./HeroVideo";
import VideoCarousel from "./VideoCarousel";

export default function Hero() {
  const { hero } = siteConfig;
  const useVideo = hero.video?.active ?? false;
  const useCarousel = hero.video?.useCarousel ?? false;
  const videoSrc = hero.video?.videoSrc as string | undefined;
  const gifSrc = hero.video?.gifSrc as string | undefined; // Support for GIF files
  const posterImage = hero.video?.posterImage || hero.image;
  const videos = hero.video?.videos || [];
  const carouselSettings = hero.video?.carouselSettings;

  // Check if source is a GIF
  const isGif = (gifSrc && typeof gifSrc === "string" && gifSrc.endsWith(".gif")) || 
                (videoSrc && typeof videoSrc === "string" && videoSrc.endsWith(".gif"));

  // Determine what to render
  const renderContent = () => {
    if (!useVideo || (!videoSrc && !gifSrc && videos.length === 0)) {
      // Fallback to static image
      return (
        <div className="relative w-full h-full">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      );
    }

    // Render video carousel if enabled and videos are available
    if (useCarousel && videos.length > 0) {
      return (
        <VideoCarousel
          videos={videos}
          autoPlay={carouselSettings?.autoPlay ?? true}
          autoAdvance={carouselSettings?.autoAdvance ?? true} // Enable auto-advance with looping
          autoAdvanceDelay={carouselSettings?.autoAdvanceDelay ?? 10}
          loop={carouselSettings?.loop ?? true} // Loop videos by default
          muted={hero.video?.muted ?? true}
          showControls={carouselSettings?.showControls ?? true}
          className="w-full h-full"
        />
      );
    }

    // Check if we should render GIF
    if (gifSrc || (videoSrc && typeof videoSrc === "string" && videoSrc.endsWith(".gif"))) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={gifSrc || videoSrc || ""}
            alt={hero.video?.posterImageAlt || hero.imageAlt}
            fill
            className="object-cover"
            priority
            unoptimized // GIFs need unoptimized
          />
        </div>
      );
    }

    // Render single video
    if (videoSrc) {
      return (
        <HeroVideo
          videoSrc={videoSrc}
          posterImage={posterImage}
          posterImageAlt={hero.video?.posterImageAlt || hero.imageAlt}
          autoPlay={hero.video?.autoPlay ?? true}
          loop={hero.video?.loop ?? true}
          muted={hero.video?.muted ?? true}
          videoType={hero.video?.videoType}
          ariaLabel={hero.video?.ariaLabel || "Hero video"}
          className="w-full h-full"
        />
      );
    }

    // Final fallback
    return (
      <div className="relative w-full h-full">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {renderContent()}
    </section>
  );
}


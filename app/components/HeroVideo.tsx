"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import react-player to avoid loading on first paint
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  ),
});

interface HeroVideoProps {
  // Video source - can be local file, YouTube, or Vimeo URL
  videoSrc: string;
  // Fallback poster image
  posterImage?: string;
  posterImageAlt?: string;
  // Auto-play settings
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  // Video type - 'local', 'youtube', or 'vimeo' (auto-detected if not provided)
  videoType?: "local" | "youtube" | "vimeo";
  // Accessibility
  ariaLabel?: string;
  // Class names
  className?: string;
  // Callbacks
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onDuration?: (duration: number) => void; // Callback when video duration is available
}

// Detect video type from URL
const detectVideoType = (url: string): "local" | "youtube" | "vimeo" => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  if (url.includes("vimeo.com")) {
    return "vimeo";
  }
  return "local";
};

// Check if user prefers reduced motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export default function HeroVideo({
  videoSrc,
  posterImage,
  posterImageAlt = "Video poster",
  autoPlay = true,
  loop = true,
  muted = true,
  videoType,
  ariaLabel,
  className = "",
  onPlay,
  onPause,
  onDuration,
  onEnded,
}: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(autoPlay && !prefersReducedMotion());
  const [isIntersecting, setIsIntersecting] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect video type
  const detectedType = videoType || detectVideoType(videoSrc);
  const isExternalVideo = detectedType === "youtube" || detectedType === "vimeo";

  // IntersectionObserver to pause video when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        threshold: 0.5, // Pause when less than 50% visible
        rootMargin: "0px",
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle play/pause based on intersection and reduced motion preference
  useEffect(() => {
    if (!shouldPlay || !isIntersecting) {
      // Pause video
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      }
      // Pause external video player
      if (playerRef.current && isExternalVideo) {
        playerRef.current.getInternalPlayer()?.pause?.();
        setIsPlaying(false);
        onPause?.();
      }
    } else if (shouldPlay && isIntersecting && isLoaded) {
      // Play video
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
      // External videos are handled by react-player
    }
  }, [shouldPlay, isIntersecting, isLoaded, isExternalVideo, onPause]);

  // Handle local video events
  const handlePlay = useCallback(() => {
    setIsLoaded(true); // Hide loading when video starts playing
    setIsPlaying(true);
    onPlay?.();
  }, [onPlay]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onEnded?.();
  }, [onEnded]);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true); // Hide loading when video starts playing
    // Get video duration and notify parent
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      onDuration?.(videoRef.current.duration);
    }
  }, [onDuration]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true); // Hide loading when video starts playing
    // Get video duration and notify parent
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      onDuration?.(videoRef.current.duration);
    }
    // Auto-play when video can play
    if (shouldPlay && isIntersecting && !prefersReducedMotion() && autoPlay) {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [shouldPlay, isIntersecting, autoPlay, onDuration]);

  // Handle external video player events
  const handleExternalPlay = useCallback(() => {
    setIsPlaying(true);
    onPlay?.();
  }, [onPlay]);

  const handleExternalPause = useCallback(() => {
    setIsPlaying(false);
    onPause?.();
  }, [onPause]);

  const handleExternalEnded = useCallback(() => {
    setIsPlaying(false);
    onEnded?.();
  }, [onEnded]);

  const handleExternalReady = useCallback(() => {
    setIsLoaded(true); // Hide loading when video starts playing
    // Get video duration from external player
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      if (player && typeof player.getDuration === 'function') {
        try {
          const duration = player.getDuration();
          if (duration && !isNaN(duration)) {
            onDuration?.(duration);
          }
        } catch (error) {
          // Duration might not be available yet
        }
      }
    }
  }, [onDuration]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      aria-label={ariaLabel}
    >
      {/* Local Video */}
      {!isExternalVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay={autoPlay && !prefersReducedMotion()}
          loop={loop}
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          aria-label={ariaLabel}
        />
      )}
      {isExternalVideo && ReactPlayer && (
        <div className="absolute inset-0">

          <ReactPlayer
            ref={playerRef}
            url={videoSrc}
            playing={shouldPlay && isIntersecting && !prefersReducedMotion()}
            loop={loop}
            muted={muted}
            width="100%"
            height="100%"
            playsinline
            config={{
              youtube: {
                playerVars: {
                  autoplay: shouldPlay && isIntersecting ? 1 : 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              },
              vimeo: {
                playerOptions: {
                  autoplay: shouldPlay && isIntersecting,
                  controls: false,
                  muted: muted,
                  loop: loop,
                },
              },
            }}
            onPlay={handleExternalPlay}
            onPause={handleExternalPause}
            onEnded={handleExternalEnded}
            onReady={handleExternalReady}
            className="absolute inset-0"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      )}

      {/* Fallback for external videos if react-player not available */}
      {isExternalVideo && !ReactPlayer && posterImage && (
        <div className="absolute inset-0">
          <Image
            src={posterImage}
            alt={posterImageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}


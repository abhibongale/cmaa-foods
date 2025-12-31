"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import HeroVideo from "./HeroVideo";

interface VideoItem {
  videoSrc: string;
  posterImage?: string;
  posterImageAlt?: string;
  videoType?: "local" | "youtube" | "vimeo";
  ariaLabel?: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
  autoPlay?: boolean;
  autoAdvance?: boolean; // Auto-advance to next video (works with looping via timer)
  autoAdvanceDelay?: number; // Delay in seconds before advancing to next video (default: 10 seconds per video)
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean; // Show play/pause and navigation controls
  className?: string;
}

export default function VideoCarousel({
  videos,
  autoPlay = true,
  autoAdvance = true,
  autoAdvanceDelay = 10, // Default: 10 seconds per video before advancing
  loop = true, // Default to looping videos
  muted = true,
  showControls = true,
  className = "",
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [videoDurations, setVideoDurations] = useState<Map<number, number>>(new Map());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentVideo = videos[currentIndex];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Navigation functions - defined first to avoid initialization errors
  const goToNext = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setIsPaused(false);
  }, [videos.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPaused(false);
  }, [videos.length]);

  const goToIndex = useCallback((index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setIsPaused(false);
  }, [currentIndex]);

  // Handle video ended - advance to next video (when not looping)
  const handleVideoEnded = useCallback(() => {
    if (autoAdvance && videos.length > 1 && !loop) {
      if (autoAdvanceDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          goToNext();
        }, autoAdvanceDelay * 1000);
      } else {
        goToNext();
      }
    }
  }, [autoAdvance, autoAdvanceDelay, videos.length, loop, goToNext]);

  // Handle video duration callback
  const handleVideoDuration = useCallback((duration: number) => {
    setVideoDurations((prev) => {
      const newMap = new Map(prev);
      newMap.set(currentIndex, duration);
      return newMap;
    });
  }, [currentIndex]);

  // Auto-advance timer when looping is enabled - uses video duration if available
  useEffect(() => {
    if (autoAdvance && videos.length > 1 && isPlaying && !isPaused && loop) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Use video duration if available, otherwise use autoAdvanceDelay
      const videoDuration = videoDurations.get(currentIndex);
      const delaySeconds = videoDuration && videoDuration > 0 
        ? videoDuration 
        : autoAdvanceDelay;
      
      // Set new timeout to advance to next video
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsPaused(false);
      }, delaySeconds * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, autoAdvance, autoAdvanceDelay, videos.length, isPlaying, isPaused, loop, videoDurations]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        if (isPlaying) {
          handlePause();
        } else {
          handlePlay();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToNext, goToPrevious, isPlaying, handlePlay, handlePause]);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Current Video with Smooth Transition */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <HeroVideo
              videoSrc={currentVideo.videoSrc}
              autoPlay={isPlaying && !isPaused}
              loop={loop} // Loop videos by default
              muted={muted}
              videoType={currentVideo.videoType}
              ariaLabel={currentVideo.ariaLabel || `Video ${currentIndex + 1} of ${videos.length}`}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleVideoEnded}
              onDuration={handleVideoDuration}
              className="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Overlay */}
      {showControls && videos.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Video Indicators (Dots) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={isPlaying && !isPaused ? handlePause : handlePlay}
            className="absolute top-4 right-4 z-30 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-6 h-6 text-white" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            )}
          </button>
        </>
      )}

      {/* Video Counter */}
      {showControls && videos.length > 1 && (
        <div className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
          {currentIndex + 1} / {videos.length}
        </div>
      )}
    </div>
  );
}


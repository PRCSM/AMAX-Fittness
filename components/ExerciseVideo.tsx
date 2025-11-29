
import React, { useRef, useEffect, useState } from 'react';

interface ExerciseVideoProps {
  videoUrl?: string;
  paused: boolean;
}

const ExerciseVideo: React.FC<ExerciseVideoProps> = ({ videoUrl, paused }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset state when video source changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [videoUrl]);

  // Check readyState to prevent infinite loading if video is cached
  useEffect(() => {
    const checkReadyState = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        setIsLoading(false);
        setHasError(false);
      }
    };

    // Check immediately
    checkReadyState();

    // Also set up an interval just in case events are missed (safety net)
    const interval = setInterval(checkReadyState, 500);
    return () => clearInterval(interval);
  }, [videoUrl]);

  // Handle Play/Pause logic based on prop
  useEffect(() => {
    const video = videoRef.current;
    if (video && !isLoading && !hasError) {
      if (paused) {
        video.pause();
      } else {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented:", error);
          });
        }
      }
    }
  }, [paused, isLoading, hasError]);

  const handleReady = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    // Only set error if we haven't successfully loaded yet
    if (isLoading) {
      setIsLoading(false);
      setHasError(true);
      // Log the specific error properties instead of the circular event object
      const videoError = e.currentTarget.error;
      console.error("Error loading video source:", videoError ? `Code ${videoError.code}: ${videoError.message}` : "Unknown error");
    }
  };

  if (!videoUrl) {
    return (
      <div className="h-full w-full bg-surfaceHighlight flex items-center justify-center rounded-xl border border-white/10">
        <div className="flex flex-col items-center gap-2 text-secondary">
          <span className="material-symbols-outlined text-4xl">videocam_off</span>
          <span className="text-sm font-medium">No video preview</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-surfaceHighlight z-10 rounded-xl">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#252525] z-10 rounded-xl border border-white/5">
          <span className="material-symbols-outlined text-[#FF4444] text-5xl mb-3">error_outline</span>
          <p className="text-[#FF4444] text-sm font-medium">Failed to load video</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        key={videoUrl}
        src={videoUrl}
        className={`h-full w-full object-cover transition-opacity duration-500 ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
        loop
        muted
        playsInline
        autoPlay={!paused}
        preload="auto"
        crossOrigin="anonymous"
        onCanPlay={handleReady}
        onLoadedData={handleReady}
        onError={handleError}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
      
      {/* Pause Overlay - Only show if video is valid and loaded */}
      {paused && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all z-20">
          <div className="h-16 w-16 rounded-full bg-black/60 flex items-center justify-center border border-white/20">
            <span className="material-symbols-outlined text-white text-4xl">pause</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseVideo;

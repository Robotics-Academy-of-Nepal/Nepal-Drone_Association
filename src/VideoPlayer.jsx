import React, { useState, useRef } from 'react';
import { Play, Pause, AlertCircle } from 'lucide-react';
import Video from './assets/drone_video.mp4';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);
  
  // Example video URL - replace with your actual video URL
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

  const handleVideoClick = () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Error playing video:", error);
              setError(true);
            });
          }
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        console.error("Video playback error:", err);
        setError(true);
      }
    }
  };

  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
    setError(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
            <AlertCircle className="w-12 h-12 mb-2 text-red-500" />
            <p>Error loading video. Please try again.</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-contain cursor-pointer"
              onClick={handleVideoClick}
              onError={handleVideoError}
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/40"
                onClick={handleVideoClick}
              >
                <div className="bg-white/90 rounded-full p-4 transition-transform hover:scale-110">
                  <Play className="w-12 h-12 text-black" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
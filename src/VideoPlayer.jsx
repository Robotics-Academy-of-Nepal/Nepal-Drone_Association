import React, { useState, useRef } from 'react';
import { Play, Pause, AlertCircle, X } from 'lucide-react';
import Video from './assets/drone_video.mp4'

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  
  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setIsModalOpen(false);
  };

  const handlePlayPause = (e) => {
    e.stopPropagation(); // Prevent modal from closing
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
      {/* Video Thumbnail/Preview */}
      <div 
        className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden cursor-pointer"
        onClick={handleVideoClick}
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster={Video} // Using the video source as poster
        >
          <source src={Video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
          <div className="bg-white/90 rounded-full p-4 transition-transform hover:scale-110">
            <Play className="w-12 h-12 text-black" />
          </div>
        </div>
      </div>

      {/* Modal Video Player */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              onClick={handleModalClose}
            >
              <X className="w-6 h-6 text-white cursor-pointer" />
            </button>

            {error ? (
              <div className="w-full pt-[56.25%] relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                  <AlertCircle className="w-12 h-12 mb-2 text-red-500" />
                  <p>Error loading video. Please try again.</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full pt-[56.25%]">
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full"
                  onClick={handlePlayPause}
                >
                  <source src={Video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handlePlayPause}
                  >
                    <div className="bg-white/90 rounded-full p-4 transition-transform hover:scale-110">
                      <Play className="w-12 h-12 text-black" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
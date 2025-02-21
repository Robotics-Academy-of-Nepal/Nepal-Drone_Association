import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, AlertCircle, X, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import Video from './assets/drone_video.mp4';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const thumbnailVideoRef = useRef(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        if (thumbnailVideoRef.current) {
          thumbnailVideoRef.current.currentTime = 1;
          await new Promise((resolve) => {
            thumbnailVideoRef.current.onseeked = resolve;
          });
        }
      } catch (err) {
        console.error("Error generating thumbnail:", err);
      }
    };

    generateThumbnail();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  const handleVolumeToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

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
    e.stopPropagation();
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
      {/* Thumbnail view */}
      <div 
        className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden cursor-pointer group"
        onClick={handleVideoClick}
      >
        <video
          ref={thumbnailVideoRef}
          className="hidden"
          preload="metadata"
        >
          <source src={Video} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            preload="metadata"
          >
            <source src={Video} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-4 transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-12 h-12 text-black" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="text-white text-lg font-semibold mb-1">Drone Video</h3>
              <p className="text-white/90 text-sm">Click to watch</p>
            </div>
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
            <button 
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              onClick={handleModalClose}
            >
              <X className="w-6 h-6 text-white" />
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
                  onError={handleVideoError}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                >
                  <source src={Video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Custom Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-white/90"
                    />
                    <div className="flex justify-between text-white text-sm mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                      onClick={() => handleSkip(-10)}
                    >
                      <SkipBack className="w-6 h-6" />
                    </button>

                    <button
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>

                    <button
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                      onClick={() => handleSkip(10)}
                    >
                      <SkipForward className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                        onClick={handleVolumeToggle}
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                      <div className="w-24">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-white/90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
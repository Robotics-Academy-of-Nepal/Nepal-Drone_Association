import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";

// Import fallback images
import drone11 from "./assets/drone12.jpg";
import drone12 from "./assets/drone13.jpg";
import drone13 from "./assets/drone14.jpg";
import drone14 from "./assets/drone15.png";
import drone15 from "./assets/drone16.jpg";
import drone16 from "./assets/drone18.jpg";

const ImageSlider = () => {
  const [isPopupData, setIsPopupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fallback slides
  const fallbackSlides = [
    {
      image: drone11,
      description: "Use of Drones in Disaster Risk Reduction & Management (Jajarkot)",
    },
    {
      image: drone12,
      description: "Mount Everest Cleaning Projects",
    },
    {
      image: drone13,
      description: "Use of Drones in Agriculture",
    },
    {
      image: drone14,
      description: "Use of Drone in Health Equipment Delivery",
    },
    {
      image: drone15,
      description: "Use of Drones in Urban Mapping",
    },
    {
      image: drone16,
      description: "Marriott Hotel Event Photos",
    },
  ];
  
  const [slides, setSlides] = useState(fallbackSlides);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeaturedImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.nepaldroneassociation.org.np/app/featured-images/"
      );
      
      console.log("API Response:", response.data);
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const mappedSlides = response.data.map((item) => ({
          id: item.news_event_id,
          // Ensure the image URL is complete
          image: item.image.startsWith('http') ? item.image : `https://api.nepaldroneassociation.org.np${item.image}`,
          description: item.title || "Featured Image",
        }));
        
        console.log("Mapped slides:", mappedSlides);
        setSlides(mappedSlides);
        setError(null);
      } else {
        console.log("Using fallback slides because API returned empty or invalid data");
        // Keep using fallback slides
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images. Using fallback images instead.");
      // Keep using fallback slides on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedImages();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleClick = async (id) => {
    if (!id) return;
    
    try {
      const response = await axios.get(
        `https://api.nepaldroneassociation.org.np/app/news-events/${id}/`
      );
      if (response.data) {
        console.log("Popup data:", response.data);
        setIsPopupData(response.data);
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto my-4 sm:my-8 px-4">
      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent"></div>
          <p className="mt-2">Loading featured images...</p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Image slider */}
      {!loading && slides.length > 0 && (
        <div className="p-1 rounded-xl animate-gradient-x">
          <div
            className="relative w-full rounded-xl overflow-hidden
            sm:aspect-[16/12] 
            md:aspect-[16/12] 
            lg:aspect-[16/8]"
          >
            <div
              className="flex transition-transform duration-700 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  {slide.id && (
                    <div className="absolute top-3 right-3 z-10 cursor-pointer">
                      <FaInfoCircle
                        onClick={() => handleClick(slide.id)}
                        className="text-2xl text-white drop-shadow-lg hover:text-blue-300 transition-colors"
                      />
                    </div>
                  )}
                  
                  {/* Image with error handling */}
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${slide.image}`);
                      e.target.onerror = null;
                      e.target.src = fallbackSlides[index % fallbackSlides.length].image;
                    }}
                  />

                  <div className="absolute top-40 left-30 text-xs sm:text-sm md:text-2xl lg:text-5xl xl:text-5xl px-2">
                    <div className="bg-sky-500/50 p-2 rounded inline-block">
                      <p className="font-['Orbitron'] tracking-wider">
                        <span className="text-[#003893]">Connecting Skies</span>
                        <span className="mx-1">,</span>
                        <br className="sm:hidden" />
                        <br />
                        <span className="text-[#DC143C]">Transforming Lives</span>
                      </p>
                    </div>
                  </div>

                  <div className="absolute md:bottom-0 bottom-20 left-0 right-0 md:bg-gradient-to-t from-black/70 md:to-transparent">
                    <div className="p-4 md:p-6 lg:p-6">
                      <p className="text-white text-sm md:text-lg lg:text-lg text-center leading-tight md:leading-normal">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              className="absolute left-2 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 lg:p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm z-5"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
            </button>
            <button
              className="absolute right-2 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 lg:p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm z-5"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Popup for event details */}
      {isPopupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isPopupData.name || "Event Details"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(isPopupData.images) && isPopupData.images.length > 0 ? (
                isPopupData.images.map((img, index) => (
                  <img
                    key={img.id || index}
                    src={img.image?.startsWith('http') ? img.image : `https://api.nepaldroneassociation.org.np${img.image}`}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                    onError={(e) => {
                      console.error(`Failed to load popup image: ${img.image}`);
                      e.target.onerror = null;
                      e.target.src = fallbackSlides[index % fallbackSlides.length].image;
                    }}
                  />
                ))
              ) : (
                <p className="col-span-full text-center py-4">No images available for this event.</p>
              )}
            </div>
            <button
              onClick={() => setIsPopupData(null)}
              className="mt-6 block mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
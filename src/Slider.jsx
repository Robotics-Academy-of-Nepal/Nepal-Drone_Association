import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import drone11 from './assets/drone12.jpg';
import drone12 from './assets/drone13.jpg';
import drone13 from './assets/drone14.jpg';
import drone14 from './assets/drone15.png';
import drone15 from './assets/drone16.jpg';
import drone16 from './assets/drone18.jpg';

const ImageSlider = () => {
  const slides = [
    {
      image: drone11,
      description: "Use of Drones in Disaster Risk Reduction & Management (Jajarkot)"
    },
    {
      image: drone12,
      description: "Mount Everest Cleaning Projects"
    },
    {
      image: drone13,
      description: "Use of Drones in Agriculture"
    },
    {
      image: drone14,
      description: "Use of Drone in Health Equipment Delivery"
    },
    {
        image: drone15,
        description: "Use of Drones in Urban Mapping"
    },
    {
        image: drone16,
        description: "Marriott Hotel Event Photos"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="w-full max-w-8xl mx-auto my-4 sm:my-8 px-4">
      {/* Added creative border with gradient and animation */}
      <div className="p-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-red-200 via-purple-100 to-blue-200
          aspect-[16/12] 
          sm:aspect-[16/12] 
          md:aspect-[16/12] 
          lg:aspect-[16/8]"
        >
          <div 
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative"
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="p-4 md:p-6 lg:p-6">
                    <p className="text-white text-sm md:text-lg lg:text-lg text-center leading-tight md:leading-normal">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Updated navigation buttons */}
          <button 
            className="absolute left-2 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 lg:p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </button>
          <button 
            className="absolute right-2 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 lg:p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
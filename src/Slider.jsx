import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import drone11 from "./assets/drone12.jpg";
import drone12 from "./assets/drone13.jpg";
import drone13 from "./assets/drone14.jpg";
import drone14 from "./assets/drone15.png";
import drone15 from "./assets/drone16.jpg";
import drone16 from "./assets/drone18.jpg";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";

const ImageSlider = () => {
  const [isPopupData, setIsPopupData] = useState(null);
  const initialSlides = [
    {
      image: drone11,
      description:
        "Use of Drones in Disaster Risk Reduction & Management (Jajarkot)",
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
  const [slides, setSlides] = useState(initialSlides);

  const getFeaturedImages = async () => {
    try {
      const response = await axios.get(
        `https://api.nepaldroneassociation.org.np/app/featured-images/`
      );
      if (response.data && Array.isArray(response.data)) {
        const mappedSlides = response.data.map((item) => ({
          id: item.news_event_id,
          image: item.image,
          description: item.title,
        }));
        setSlides((prevSlides) => [...prevSlides, ...mappedSlides]);
      }
    } catch (error) {
      console.log("Error fetching image", error);
    }
  };

  useEffect(() => {
    getFeaturedImages();
  }, []);

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

  const handleClick = async (id) => {
    try {
      const response = await axios.get(
        `https://api.nepaldroneassociation.org.np/app/news-events/${id}/`
      );
      if (response.data) {
        setIsPopupData(response.data);
        console.log(isPopupData);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto my-4 sm:my-8 px-4">
      {/* Added creative border with gradient and animation */}
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
                <div className="absolute top-3 right-3 padding-2">
                  <FaInfoCircle
                    onClick={() => handleClick(slide.id)}
                    className="text-2xl text-white"
                  />
                </div>
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
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

      {isPopupData ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isPopupData.name} - Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(isPopupData.images|| []).map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt="Event"
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
            <button
              onClick={()=> setIsPopupData(null)}
              className="mt-6 block mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageSlider;

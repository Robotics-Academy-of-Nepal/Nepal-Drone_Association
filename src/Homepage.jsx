import React, { useEffect, useState } from 'react';
import axios from 'axios';
import image from './assets/drone.png';
import drone18 from './assets/drone18.jpg';
import drone19 from './assets/drone19.jpg';
import drone21 from './assets/drone21.jpg';
import Navbar from "./NavBar";
import Footer from "./Footer";
import { Camera, Battery, Gauge } from "lucide-react";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/images/');
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news images');
      setLoading(false);
    }
  };

  const specs = [
    {
      icon: <Camera className="w-8 h-8 mb-3" />,
      title: "Camera",
      description: "20 MP Resolution 4k at 30 FPS",
    },
    {
      icon: <Battery className="w-8 h-8 mb-3" />,
      title: "Battery",
      description: "Max Flight time 45 Minutes",
    },
    {
      icon: <Gauge className="w-8 h-8 mb-3" />,
      title: "Speed",
      description: "Max Speed 79 MPH (22m/s)",
    },
  ];

  const createSlides = () => {
    if (loading) return [];
    if (error) return [];
    
    return images.map(image => ({
      preview: (
        <div className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 w-full p-6 text-center rounded-2xl border-2">
          <img 
            src={image.image} 
            alt={image.title} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="line-clamp-3">{image.description}</p>
          <div className="block p-6 rounded-2xl">
            <div>
              <span className="font-bold">{image.title}</span>
            </div>
          </div>
        </div>
      ),
      fullContent: {
        title: image.title,
        description: image.description,
        image: image.image
      }
    }));
  };

  const slides = createSlides();

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-2">
        {/* First section with drone image */}
        <div className="bg-gradient-to-b from-red-200 to-blue-200">
          <div className="mt-2 w-full text-wrap flex items-center rounded-md px-2 lg:flex-row">
            <div className="sm:text-lg md:text-4xl lg:text-6xl xl:text-7xl px-4">
              <p>The most interesting drone in the world</p>
            </div>
            <div className="relative h-auto overflow-hidden">
              <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <img src={image} alt="Drone" className="w-full h-auto object-contain animate-hover" />
              </div>
            </div>
          </div>

          {/* Specs section */}
          <div className="rounded-lg mx-auto p-6 mt-2">
            <div className="rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specs.map((spec, index) => (
                  <div key={spec.title} className="flex flex-col items-center text-center p-4">
                    {spec.icon}
                    <h3 className="text-lg font-semibold mb-2">{spec.title}</h3>
                    <p className="text-sm text-gray-600">{spec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image sections */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-2 mb-2 rounded-2xl">
          <div className="w-fit lg:w-1/2 flex">
            <img src={drone19} className="w-200 h-auto lg:h-100 object-cover rounded-2xl" alt="Drone" />
          </div>
          <div className="w-fit mx-2 lg:w-1/1 bg-gradient-to-tr from-red-200 to-blue-200 p-6 flex items-center justify-center rounded-2xl">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-center">We Use The Best Drones & HD Cameras</h2>
              <p className="mt-2 text-sm md:text-base text-center">
                It can be equipped with a variety of additional equipment, including cameras, GPS guided missiles,
                Global Positioning Systems (GPS), navigation systems, sensors, and so on.
              </p>
              <p className="mt-2 text-sm md:text-base text-center">
                DroCam 3.4k is the updated version of the very popular DroCam 3 drone. As you may believe, the most attention went to the camera.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl">
          <div className="bg-gradient-to-tr from-red-200 to-blue-200 w-fit lg:w-1/1 p-6 bg-gray-300 flex items-center justify-center rounded-2xl">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-center">Hovering and Automatic Flight Positioning</h2>
              <p className="mt-2 text-sm md:text-base text-center">
                Besides being able to fly without you worrying about it ramming into
                objects, this drone can hover. As it has done in other products.
              </p>
              <p className="mt-2 text-sm md:text-base text-center">
                DroCam has included its Vision Positioning System(VPS), VPS locks the drone
                in place when necessary, and it can stay put for hours.
              </p>
            </div>
          </div>
          <div className="w-fit lg:w-1/2 flex mx-2">
            <img className="w-150 h-auto lg:h-100 object-cover rounded-2xl" src={drone21} alt="Drone" />
          </div>
        </div>

        <div className="lg:w-full mt-2 flex">
          <img className="w-full rounded-2xl cursor-pointer lg:w-full" src={drone18} alt="Drone" />
        </div>

        {/* News slider section */}
        <div className="relative w-full max-w-6xl mx-auto mt-4 mb-4">
          {loading ? (
            <div className="text-center p-8 bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-2xl">
              Loading news...
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-2xl">
              {error}
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden rounded-2xl">
                <div className="transition-transform duration-300 ease-in-out cursor-pointer" onClick={() => setIsModalOpen(true)}>
                  {slides[currentSlide]?.preview}
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && slides[currentSlide] && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {slides[currentSlide].fullContent.title}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {slides[currentSlide].fullContent.image && (
                  <img
                    src={slides[currentSlide].fullContent.image}
                    alt={slides[currentSlide].fullContent.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="prose max-w-none">
                  {slides[currentSlide].fullContent.description.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
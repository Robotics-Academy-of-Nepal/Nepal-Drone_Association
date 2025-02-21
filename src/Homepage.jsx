import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import image from './assets/drone.png';
import drone18 from './assets/drone18.jpg';
import Navbar from "./NavBar";
import Footer from "./Footer";
import { Camera, Battery, Gauge } from "lucide-react";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import About from './About';
import TeamPage from './Team';
import ImageSlider from './Slider';

function Homepage() {
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const newsRef= useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slidesPerView = 3;
  const [currentIndex, setCurrentIndex] = useState(0);


  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet with 2 cards
      return 3; // desktop with 3 cards
    }
    return 3;
  };

  
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  const cardWidth = 33.33; // Fixed width for each card

  useEffect(() => {
    setIsVisible(true);
    fetchImages();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.nepaldroneassociation.org.np/app/images/');
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

  const truncateText = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const createSlides = () => {
    if (loading) return [];
    if (error) return [];
    
    return images.map((image, index) => ({
      id: index,
      preview: (
        <div className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 w-full h-full p-6 text-center rounded-2xl border-2 flex flex-col">
          <div className="relative w-full pb-[66.67%]">
            <img 
              src={image.image_url} 
              alt={image.title} 
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between mt-4">
            <div>
              <h3 className="font-bold text-lg h-14 line-clamp-2 mb-2">
                {truncateText(image.title, 8)}
              </h3>
              <p className="text-base h-20 line-clamp-4">
                {truncateText(image.description, 20)}
              </p>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Read More
              </button>
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
  const totalSlides = Math.ceil(slides.length / Math.min(slidesPerView, slides.length));

  // Update the getVisibleSlides function
  const getVisibleSlides = () => {
    const start = currentSlide;
    const end = start + slidesPerView;
    return slides.slice(start, end);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    const maxSlides = slides.length - cardsToShow;
    setCurrentIndex(prev => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const openModal = (slideIndex) => {
    setSelectedSlideIndex(slideIndex);
    setIsModalOpen(true);
  };

  // Add this function inside Homepage component
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar 
        onAboutClick={() => scrollToSection(aboutRef)}
        onTeamClick={() => scrollToSection(teamRef)}
        onNewsClick={()=>scrollToSection(newsRef)}
      />
      <ImageSlider />
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
        {/* <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-2 mb-2 rounded-2xl">
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
        </div> */}
        <section ref={aboutRef}>
          <About />
        </section>

        <section ref={teamRef}>
          <TeamPage />
        </section>

        <div className="lg:w-full mt-2 flex">
          <img className="w-full rounded-2xl cursor-pointer lg:w-full" src={drone18} alt="Drone" />
        </div>

        {/* News slider section */}
        <section ref={newsRef}>
        <div className="relative w-full max-w-7xl mx-auto mt-8 mb-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>
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
              <div className="relative overflow-hidden rounded-2xl p-4">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                    width: `${(slides.length / cardsToShow) * 100}%`
                  }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="px-2 transition-all duration-300"
                      style={{ width: `${300 / cardsToShow}%` }}
                      onClick={() => openModal(index)}
                    >
                      <div className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 h-full p-4 text-center rounded-2xl border-2 flex flex-col cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                        {/* Updated image container with larger width */}
                        <div className="relative w-full pb-[70.67%] mb-4">
                          <img 
                            src={slide.fullContent.image} 
                            alt={slide.fullContent.title} 
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-xl mb-2 line-clamp-2">
                              {slide.fullContent.title}
                            </h3>
                            <p className="text-base line-clamp-3">
                              {slide.fullContent.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation buttons */}
                {slides.length > cardsToShow && (
                  <>
                    <button
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      className={`absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 ${
                        currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                      }`}
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      disabled={currentIndex >= slides.length - cardsToShow}
                      className={`absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 ${
                        currentIndex >= slides.length - cardsToShow ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                      }`}
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Pagination dots */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: Math.ceil((slides.length - cardsToShow + 1) / 1) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide group ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>


      {/* Updated Modal */}
      {isModalOpen && selectedSlideIndex !== null && slides[selectedSlideIndex] && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsModalOpen(false);
            setSelectedSlideIndex(null);
          }}
        >
          <div
            className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold pr-4 break-words">
                  {slides[selectedSlideIndex].fullContent.title}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedSlideIndex(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>

              <div className="mb-4">
                <img
                  src={slides[selectedSlideIndex].fullContent.image}
                  alt={slides[selectedSlideIndex].fullContent.title}
                  className="w-full max-h-[50vh] object-contain rounded-lg"
                />
              </div>

              <div className="prose max-w-none">
                <div className="space-y-4 text-base sm:text-lg">
                  {slides[selectedSlideIndex].fullContent.description.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 break-words">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </section>
      </div>
      <Footer 
        onAboutClick={() => scrollToSection(aboutRef)}
        onTeamClick={() => scrollToSection(teamRef)}
      />
    </>
  );
}

export default Homepage;
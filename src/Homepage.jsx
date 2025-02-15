import React, { useEffect, useState } from 'react';
import image from './assets/drone.png';
import drone1 from './assets/drone1.png';
import drone2 from './assets/drone2.png';
import drone3 from './assets/drone3.png';
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

    useEffect(() => {
        setIsVisible(true);
      }, []);

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


      //sliders code
      const slides = [
        {
          preview: (
            <div className="bg-[rgb(219,219,219)] w-full p-6 text-center rounded-2xl border-2">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta praesentium vitae perspiciatis voluptas incidunt velit, aut sapiente? Assumenda eum illo.</p>
              <div className="block p-6 rounded-2xl">
                <div>
                  <span>Lorem, ipsum dolor.</span>
                  <br />
                  Lorem ipsum dolor sit.
                </div>
              </div>
            </div>
          ),
          fullContent: {
            title: "News 1",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque maiores ratione 
            nemo error possimus sequi nam modi expedita totam, recusandae facilis quod iusto eos! 
            Necessitatibus vitae nihil ratione assumenda cupiditate!
    
            Ullam corporis suscipit minus ducimus esse architecto ratione error amet ipsum laudantium 
            temporibus eos accusantium, ab dolores aspernatur dignissimos commodi debitis facilis 
            exercitationem voluptatum blanditiis! Quas delectus magnam nulla rem.`
          }
        },
        {
          preview: (
            <div className="bg-[rgb(219,219,219)] w-full p-6 text-center rounded-2xl border-2">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos natus ratione culpa repudiandae corporis? Vitae alias, unde labore nulla libero ipsa</p>
              <div className="block p-6 rounded-2xl">
                <div>
                  <span>Lorem, ipsum dolor.</span>
                  <br />
                  Lorem ipsum dolor sit.
                </div>
              </div>
            </div>
          ),
          fullContent: {
            title: "News 2",
            description: `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
            nulla pariatur. Excepteur sint occaecat cupidatat non proident.`
          }
        },
        {
          preview: (
            <div className="bg-[rgb(219,219,219)] w-full p-6 text-center rounded-2xl border-2">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima voluptates illum iure repudiandae, explicabo deserunt accusantium</p>
              <div className="block p-6 rounded-2xl">
                <div>
                  <span>Lorem, ipsum dolor.</span>
                  <br />
                  Lorem ipsum dolor sit.
                </div>
              </div>
            </div>
          ),
          fullContent: {
            title: "News 3",
            description: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
            praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.
    
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id 
            quod maxime placeat facere possimus.`
          }
        }
      ];
    
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
            <div class="container mx-auto px-4 mt-2">
                <div class="bg-[rgb(219,219,219)]">
                <div class="mt-2 w-full text-wrap flex items-center rounded-md px-2 lg:flex-row">
                    <div class="sm:text-lg md:text-4xl lg:text-6xl xl:text-7xl px-4">
                        <p>The most interesting drone in the world</p>
                    </div>
                    <div className="relative h-auto overflow-hidden">
                        <div
                        className={`transform transition-all duration-1000 ease-out
                            ${isVisible ? 'translate-x-0' : 'translate-x-full'}
                                `}
                        >
                        <img 
                        src={image} 
                        alt="Drone"
                        className="w-full h-auto object-contain animate-hover"
                        />
                        </div>
                    </div>
                </div>


                <div className="rounded-lg mx-auto p-6  mt-2">
                    <div className=" rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {specs.map((spec, index) => (
                            <div
                                key={spec.title}
                                className="flex flex-col items-center text-center p-4"
                            >
                            {spec.icon}
                            <h3 className="text-lg font-semibold mb-2">{spec.title}</h3>
                            <p className="text-sm text-gray-600">{spec.description}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>


                <div class="flex flex-col lg:flex-row items-center lg:items-stretch mt-2 mb-2 rounded-2xl">
                    <div class="w-fit lg:w-1/2 flex">
                    <img src={drone19} class="w-200 h-auto lg:h-100 object-cover rounded-2xl"></img>
                    </div>

                    <div class="w-fit mx-2 lg:w-1/1 bg-[rgb(219,219,219)] p-6 flex items-center justify-center rounded-2xl">
                        <div>
                            <h2 class="text-lg md:text-xl font-bold text-center">We Use The Best Drones & HD Cameras</h2>
                                <p class="mt-2 text-sm md:text-base text-center">
                                It can be equipped with a variety of additional equipment, including cameras, GPS guided missiles, 
                                Global Positioning Systems (GPS), navigation systems, sensors, and so on.</p>
                                 <p class="mt-2 text-sm md:text-base text-center">
                                 DroCam 3.4k is the updated version of the very popular DroCam 3 drone. As you may believe, the most attention went to the camera.
                                </p>
                        </div>
                    </div>
                </div>



                <div class="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl">
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 bg-gray-300 flex items-center justify-center rounded-2xl">
                    <div>
                        <h2 class="text-lg md:text-xl font-bold text-center">Hovering and Automatic Flight Positioning</h2>
                        <p class="mt-2 text-sm md:text-base text-center">Besides being able to fly without you worrying about it ramming into
                            objects, this drone can hover. As it has done in other products.</p>
                            <p class="mt-2 text-sm md:text-base text-center">
                            DroCam has included its Vision Positioning System(VPS), VPS locks the drone<br></br>
                            in place when necessary, and it can stay put for hours.</p>
                         </div>
                    </div>
                    <div class="w-fit lg:w-1/2 flex mx-2 w-fit">
                        <img class="w-150 h-auto lg:h-100 object-cover rounded-2xl" src={drone21}></img>
                    </div>
                </div>


                <div class="lg:w-full mt-2 flex">
                    <img class="w-full rounded-2xl cursor-pointer lg:w-full" src={drone18}></img>
                </div>


                {/* news flash sliders */}

                <div className="relative w-full max-w-6xl mx-auto mt-4 mb-4">
        {/* Main Slider Container */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Current Slide */}
          <div 
            className="transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {slides[currentSlide].preview}
          </div>

          {/* Navigation Buttons */}
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

        {/* Slide Indicators */}
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
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
    )
}  

export default Homepage;
import React, { useEffect, useState } from 'react';
import image from './assets/drone.png';
import drone1 from './assets/drone1.png';
import drone2 from './assets/drone2.png';
import drone3 from './assets/drone3.png';
import Navbar from "./NavBar";
import Footer from "./Footer";
import { Camera, Battery, Gauge } from "lucide-react";

function Homepage() {

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



    return (
        <>
        <Navbar />
            <div
                class="container mx-auto px-4 mt-2"
            >
                <div class="mt-2 w-full text-wrap flex items-center bg-[rgb(219,219,219)] rounded-md px-2 lg:flex-row">
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


                <div className="rounded-lg mx-auto p-6 bg-[rgb(219,219,219)] mt-2">
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


                <div class="flex flex-col lg:flex-row items-center lg:items-stretch p-4 rounded-2xl">
                    <div class="w-fit lg:w-1/2 flex">
                    <img src={drone1} class="w-200 h-auto lg:h-100 object-cover rounded-2xl"></img>
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
                        <img class="w-150 h-auto lg:h-100 object-cover rounded-2xl" src={drone2}></img>
                    </div>
                </div>


                <div class="lg:w-full mt-2 flex">
                    <img class="w-full lg:w-full" src={drone3}></img>
                </div>


                <div class="flex flex-col lg:flex-row items-center lg:items-stretch p-4 rounded-2xl" >
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 text-center rounded-2xl mx-4 border-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta praesentium vitae perspiciatis voluptas incidunt velit, aut sapiente? Assumenda eum illo. <br>
                        </br>
                        <div class="block w-fit lg:w-1/1 p-6 rounded-2xl">
                            <div>
                                <span>Lorem, ipsum dolor.</span><br></br>
                                Lorem ipsum dolor sit.
                            </div>
                        </div>
                    </div>
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 text-center rounded-2xl mx-4 border-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos natus ratione culpa repudiandae corporis? Vitae alias, unde labore nulla libero ipsa <br>
                        </br>
                        <div class="block w-fit lg:w-1/1  p-6 rounded-2xl">
                            <div>
                                <span>Lorem, ipsum dolor.</span><br></br>
                                Lorem ipsum dolor sit.
                            </div>
                        </div>
                    </div>
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 text-center rounded-2xl mx-4 border-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima voluptates illum iure repudiandae, explicabo deserunt accusantium<br>
                        </br>
                        <div class="block w-fit lg:w-1/1 p-6 rounded-2xl">
                            <div>
                                <span>Lorem, ipsum dolor.</span><br></br>
                                Lorem ipsum dolor sit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}  

export default Homepage;
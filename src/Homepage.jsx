import React from "react";
import image1 from './assets/camera.png';
import image2 from './assets/battery.png';
import image3 from './assets/speed.png';
import image from './assets/drone.png';
import drone1 from './assets/drone1.png';
import drone2 from './assets/drone2.png';
import drone3 from './assets/drone3.png';
import drone4 from "./assets/drone4.png";
import drone5 from "./assets/drone5.png";
import drone9 from "./assets/drone9.png";
import drone10 from  "./assets/drone10.png";
// import drone6 from "./assets/drone6.png";
// import drone7 from "./assets/drone7.png";

function Homepage() {



    return (
        <>
            <div
                class="container mx-auto px-4 mt-2"
            >
                <div class="mt-2 w-full text-wrap flex items-center bg-[rgb(219,219,219)] rounded-md px-2 lg:flex-row">
                    <div class="sm:text-lg md:text-4xl lg:text-4xl xl:text-4xl px-2">
                        <p>The most interesting drone in the world</p>
                    </div>
                    <div class="h-auto">
                        <img src={image}></img>
                    </div>
                </div>


                <div class="mt-2 text-wrap items-center flex flex-col md:flex-row lg:flex-row items-center lg:items-stretch">
                    <div class="bg-[rgb(219,219,219)] rounded-xl mx-1">
                        <img class=" mx-auto sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" src={image1}></img>
                        <p class="text-wrap text-center m:text-lg md:text-4xl lg:text-4xl xl:text-4xl font-bold mt-1">Camera</p>
                        <p class="text-wrap text-center m:text-md md:text-md lg:text-md xl:text-md mt-2 mb-2">20 MP Resolution 4k at 30 FPS</p>
                    </div>
                    <div class="bg-[rgb(219,219,219)] rounded-xl mx-1">
                        <img class="mx-auto sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" src={image2}></img>
                        <p class="text-wrap text-center m:text-lg md:text-4xl lg:text-4xl xl:text-4xl font-bold mt-1">Battery</p>
                        <p class="text-wrap text-center m:text-md md:text-md lg:text-md xl:text-md mt-2 mb-2">Max Flight time 45 Minutes</p>
                    </div>
                    <div class="bg-[rgb(219,219,219)] rounded-xl mx-1">
                        <img class="mx-auto sm:w-1/3  md:w-1/3 lg:w-1/3 xl:w-1/3" src={image3}></img>
                        <p class="text-wrap text-center m:text-lg md:text-4xl lg:text-4xl xl:text-4xl font-bold mt-1">Speed</p>
                        <p class="text-wrap text-center m:text-md md:text-md lg:text-md xl:text-md mt-2 mb-2">Max Speed 79 MPH (22 m/s)</p>
                    </div>
                </div>


                <div class="flex flex-col lg:flex-row items-center lg:items-stretch p-4 rounded-2xl">
                    <div class="w-fit lg:w-1/2 flex">
                    <img src={drone1} class="w-100 h-auto lg:h-100 object-cover rounded-2xl"></img>
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



                <div class="flex flex-col lg:flex-row items-center lg:items-stretch p-4 rounded-2xl">
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1  bg-gray-300 p-6 flex items-center justify-center rounded-2xl">
                    <div>
                        <h2 class="text-lg md:text-xl font-bold text-center">Hovering and Automatic Flight Positioning</h2>
                        <p class="mt-2 text-sm md:text-base text-center">Besides being able to fly without you worrying about it ramming into
                            objects, this drone can hover. As it has done in other products.</p>
                            <p class="mt-2 text-sm md:text-base text-center">
                            DroCam has included its Vision Positioning System(VPS), VPS locks the drone<br></br>
                            in place when necessary, and it can stay put for hours.</p>
                         </div>
                    </div>
                    <div class="w-fit lg:w-1/2 flex mx-2">
                        <img class="w-100 h-auto lg:h-100 object-cover rounded-2xl" src={drone2}></img>
                    </div>
                </div>


                <div class="w-full mt-2">
                    <img src={drone3}></img>
                </div>


                {/* <div class="flex">
                    <div className="image5">
                        <img className="image8" src={drone4}></img>
                    </div>
                    <div className="image6">
                        <div className="image7">
                            <img className="image9" src={drone5}></img>
                            <img className="image9" src={drone9}></img>
                        </div>
                        <div className="image20">
                            <img className="image21" src={drone10}></img>
                        </div>
                    </div>
                </div> */}


                <div class="flex flex-col lg:flex-row items-center lg:items-stretch p-4 rounded-2xl" >
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 text-center rounded-2xl mx-4 border-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta praesentium vitae perspiciatis voluptas incidunt velit, aut sapiente? Assumenda eum illo. <br>
                        </br>
                        <div class="block w-fit lg:w-1/1  bg-gray-300 p-6 rounded-2xl">
                            <div>
                                <span>Lorem, ipsum dolor.</span><br></br>
                                Lorem ipsum dolor sit.
                            </div>
                        </div>
                    </div>
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 rounded-2xl mx-4 border-2 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos natus ratione culpa repudiandae corporis? Vitae alias, unde labore nulla libero ipsa <br>
                        </br>
                        <div class="flex items-center justify-center mt-4">
                            <div>
                                <span>Lorem, ipsum dolor.</span><br></br>
                                Lorem ipsum dolor sit.
                            </div>
                        </div>
                    </div>
                    <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 rounded-2xl mx-4 border-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima voluptates illum iure repudiandae, explicabo deserunt accusantium<br>
                        </br>
                        <div class="flex items-center justify-center mt-4">
                            <div>
                                <span>Lorem, ipsum dolor.</span><br></br>
                                Lorem ipsum dolor sit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;
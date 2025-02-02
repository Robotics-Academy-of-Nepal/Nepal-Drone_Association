import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import drone10 from "./assets/drone10.png";
import drone11 from "./assets/drone11.png";

function About(){
    return(
        <>
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2">
      <div className="p-1">
        <div className="relative">
          <img 
            src={drone10}
            alt="Placeholder" 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
          <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-end">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              Lorem, ipsum dolor.
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg mt-2 sm:mt-4 max-w-2xl">
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>

        <div class="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl mt-2 mb-4">
        <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 bg-gray-300 rounded-2xl">
            <p class=" md:text-xl font-bold text-4xl ">About us</p>
            <p class="mt-2 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident possimus 
                        deserunt quam error. Ut ratione nobis hic praesentium, facere repellendus tempora iure nulla cupiditate, et repudiandae? 
                        Eos eaque tempore doloremque at quis saepe adipisci iure quibusdam, perspiciatis unde. Corrupti et temporibus vero consequuntur
                         laudantium officia modi, aspernatur similique tempora. Sapiente quidem modi sint, quod unde fuga? Nesciunt magni modi 
                         iste quas aperiam nam tenetur repellendus, expedita voluptas saepe deleniti vitae veniam soluta nihil aliquam. Adipisci 
                         quod amet asperiores laborum! Veniam delectus possimus sed rerum iste
                         cumque recusandae est quasi, minima ex veritatis omnis officia autem ab blanditiis eveniet fuga iure!</p>
        </div>

        </div>


        <div class="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl mt-2 mb-4">
            <div class="bg-[rgb(219,219,219)] w-fit lg:w-1/1 p-6 bg-gray-300 flex items-center justify-center rounded-2xl">
                <div>
                    <h2 class="text-lg md:text-xl font-bold text-center">Lorem ipsum dolor sit amet.
                    </h2>
                    <p class="mt-2 text-sm md:text-base text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident possimus 
                        deserunt quam error. Ut ratione nobis hic praesentium, facere repellendus tempora iure nulla cupiditate, et repudiandae? 
                        Eos eaque tempore doloremque at quis saepe adipisci iure quibusdam, perspiciatis unde. Corrupti et temporibus vero consequuntur
                         laudantium officia modi, aspernatur similique tempora. Sapiente quidem modi sint, quod unde fuga? Nesciunt magni modi 
                         iste quas aperiam nam tenetur repellendus, expedita voluptas saepe deleniti vitae veniam soluta nihil aliquam. Adipisci 
                         quod amet asperiores laborum! Veniam delectus possimus sed rerum iste
                         cumque recusandae est quasi, minima ex veritatis omnis officia autem ab blanditiis eveniet fuga iure!</p>
                    <p class="mt-2 text-sm md:text-base text-center">
                    DroCam has included its Vision Positioning System(VPS), VPS locks the drone<br></br>
                    in place when necessary, and it can stay put for hours.</p>
                </div>
            </div>
            <div class="w-fit lg:w-1/2 flex mx-2 w-fit">
                <img class="w-150 h-auto lg:h-100 object-cover rounded-2xl" src={drone11}></img>
            </div>
        </div>
        
      </div>
      <Footer />
        </>
    )
}

export default About;
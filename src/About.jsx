import React from "react";
import drone14 from './assets/drone14.jpg';
import drone12 from './assets/drone12.jpg';
import drone19 from './assets/drone19.jpg';

function About() {
  return (
    <>
      {/* Container with conditional max-width */}
      <div className="max-w-screen-lg xl:max-w-none 2xl:max-w-none mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        {/* <div className="p-1">
          <div className="relative">
            <img
              src={drone14}
              alt="Placeholder"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />

            <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-end">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                About us
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg mt-2 sm:mt-4 max-w-2xl">
                Know something about us.
              </p>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl mt-2 mb-4">
          <div className="bg-gradient-to-r from-[#DC143C] to-[#003893] text-white w-fit lg:w-1/1 p-6 bg-gray-300 rounded-2xl">
            <p className="md:text-xl font-bold text-4xl">About us</p>
            <p className="mt-2 text-sm md:text-base">
              The Nepal Drone Association (NDA) is the premier organization dedicated to uniting and empowering the growing community of drone professionals, enthusiasts, and businesses in Nepal. Our association was founded with a clear mission: to foster a thriving drone ecosystem, advocate for the rights of industry stakeholders, and establish Nepal as a leader in drone technology and innovation.<br></br>
              In recent years, drones have revolutionized industries worldwide, from agriculture and infrastructure to disaster management and environmental conservation. Nepal, with its unique geographical challenges and developmental aspirations, stands to gain immensely from the application of drone technology. However, the absence of a unified platform to address the needs of this emerging sector has been a significant barrier to its growth. NDA was established to fill this gap and to drive progress in Nepal’s drone industry.<br></br>
              Despite its immense potential, Nepal's drone industry faces several significant challenges. Drone professionals and businesses lack a unified platform to advocate for their needs and safeguard their rights. The absence of clear and comprehensive regulations has slowed innovation and adoption of drone technology. Additionally, many stakeholders remain unaware of the full potential of drones or lack the skills to use them effectively. This fragmented ecosystem, with minimal coordination between professionals, businesses, and government agencies, has hindered the sector's growth and prevented it from reaching its full potential.<br></br>
              Recognizing these challenges, the Nepal Drone Association was established to address these gaps and drive progress in the drone industry. Serving as the umbrella organization for all drone professionals, enthusiasts, and businesses in Nepal, the Association advocates for inclusive policies that foster innovation and fair labor practices. It is dedicated to providing education, training, and certifications to develop a skilled workforce while fostering partnerships with local and international stakeholders to share expertise and resources. Through these initiatives, the Nepal Drone Association aims to unify and empower the drone community, driving sustainable growth and innovation in Nepal’s drone sector.<br></br>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl mt-2 mb-4">
          <div className="bg-gradient-to-l from-[#DC143C] to-[#003893] text-white w-fit lg:w-1/1 p-6 bg-gray-300 flex items-center justify-center rounded-2xl">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-center">Our Mission.</h2>
              <p className="mt-2 text-sm md:text-base text-center">
                To foster a thriving drone ecosystem in Nepal by supporting professionals, advocating for industry-friendly policies, and promoting the safe and innovative application of drone technology.
              </p>
              {/* <p className="mt-2 text-sm md:text-base text-center">
                DroCam has included its Vision Positioning System(VPS), VPS locks the drone<br></br>
                in place when necessary, and it can stay put for hours.
              </p> */}

              <h2 className="text-lg md:text-xl font-bold text-center mt-5">Our Vision</h2>
              <p className="mt-2 text-sm md:text-base text-center">
                To establish Nepal as a global leader in drone technology, leveraging its potential to drive sustainable development and create new opportunities in diverse industries.
              </p>
              {/* <p className="mt-2 text-sm md:text-base text-center">
                DroCam 3.4k is the updated version of the very popular DroCam 3 drone. As you may believe, the most attention went to the camera.
              </p> */}
            </div>
          </div>
          <div className="w-fit lg:w-1/2 flex mx-2">
            <img className="w-150 h-auto lg:h-100 object-cover rounded-2xl" src={drone12} alt="Drone" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-2 mb-2 rounded-2xl">
          <div className="w-fit lg:w-1/2 flex">
            <img src={drone19} className="w-200 h-auto lg:h-auto object-cover rounded-2xl" alt="Drone" />
          </div>
          <div className="w-fit mx-2 lg:w-1/1 bg-gradient-to-r from-[#DC143C] to-[#003893] p-6 flex items-center justify-center rounded-2xl text-white">
            <div>
              {/* <h2 className="text-lg md:text-xl font-bold text-center">Our Vision</h2>
              <p className="mt-2 text-sm md:text-base text-center">
                To establish Nepal as a global leader in drone technology, leveraging its potential to drive sustainable development and create new opportunities in diverse industries.
              </p>
              <p className="mt-2 text-sm md:text-base text-center">
                DroCam 3.4k is the updated version of the very popular DroCam 3 drone. As you may believe, the most attention went to the camera.
              </p> */}
              <p className="md:text-xl font-bold text-4xl">What We Do</p>
              <p className="mt-2 text-sm md:text-base">
                1. Professional Support: We act as an umbrella organization for all drone professionals and businesses, providing guidance, resources, and opportunities for growth.
                <br></br>2. Advocacy: We represent the drone community to the Nepal Government, advocating for policies that support fair labor practices, innovation, and growth in the sector.
                <br></br>3. Policy Assistance: We work closely with government agencies to draft and amend drone-related laws and policies, ensuring they are forward-looking and inclusive.
                <br></br>4. Networking & Collaboration: We connect members with national and international organizations, fostering partnerships and knowledge exchange.
                <br></br>5. Education & Training: We organize workshops, training sessions, and certification programs to enhance skills and ensure safety in drone operations.
                <br></br>6. Sector Expansion: We actively promote the use of drones in agriculture, disaster management, infrastructure development, and other fields to contribute to Nepal's progress.
              </p>

              <p className="md:text-xl font-bold text-4xl mt-5">Why Choose NDA</p>
              <p className="mt-2 text-sm md:text-base">
                ● Expert Guidance: Led by experienced professionals, NDA offers unparalleled insights and leadership in the drone sector.
                <br></br>● Advocacy & Representation: We ensure that the voices of drone professionals and businesses are heard at the policy-making level.
                <br></br>● Innovation & Growth: Our initiatives drive innovation, helping members stay ahead in the rapidly evolving drone industry.
                <br></br><br></br>Join us in shaping the future of drone technology in Nepal. Together, we can harness the potential of drones to transform industries, improve lives, and contribute to a sustainable and prosperous future.
              </p>

            </div>
          </div>
        </div>

        {/* <div className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl mt-2 mb-4">
          <div className="bg-gradient-to-b from-red-100 to-blue-100 w-fit lg:w-1/1 p-6 bg-gray-300 rounded-2xl">
            <p className="md:text-xl font-bold text-4xl">What We Do</p>
            <p className="mt-2 text-sm md:text-base">
              1. Professional Support: We act as an umbrella organization for all drone professionals and businesses, providing guidance, resources, and opportunities for growth.
              <br></br>2. Advocacy: We represent the drone community to the Nepal Government, advocating for policies that support fair labor practices, innovation, and growth in the sector.
              <br></br>3. Policy Assistance: We work closely with government agencies to draft and amend drone-related laws and policies, ensuring they are forward-looking and inclusive.
              <br></br>4. Networking & Collaboration: We connect members with national and international organizations, fostering partnerships and knowledge exchange.
              <br></br>5. Education & Training: We organize workshops, training sessions, and certification programs to enhance skills and ensure safety in drone operations.
              <br></br>6. Sector Expansion: We actively promote the use of drones in agriculture, disaster management, infrastructure development, and other fields to contribute to Nepal's progress.
            </p>
          </div>
        </div> */}

        {/* <div className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl mt-2 mb-4">
          <div className="bg-gradient-to-b from-red-100 to-blue-100 w-fit lg:w-1/1 p-6 bg-gray-300 rounded-2xl">
            <p className="md:text-xl font-bold text-4xl">Why Choose NDA</p>
            <p className="mt-2 text-sm md:text-base">
              ● Expert Guidance: Led by experienced professionals, NDA offers unparalleled insights and leadership in the drone sector.
              <br></br>● Advocacy & Representation: We ensure that the voices of drone professionals and businesses are heard at the policy-making level.
              <br></br>● Innovation & Growth: Our initiatives drive innovation, helping members stay ahead in the rapidly evolving drone industry.
              <br></br><br></br>Join us in shaping the future of drone technology in Nepal. Together, we can harness the potential of drones to transform industries, improve lives, and contribute to a sustainable and prosperous future.
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default About;
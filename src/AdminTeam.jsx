import React, { useEffect, useState } from "react";
import member1 from "./assets/member1.jpg";
import member2 from "./assets/member2.png";
import member3 from "./assets/member3.jpg";
import member4 from "./assets/member4.jpg";
import member5 from "./assets/member5.png";
import member6 from "./assets/member6.png";
import member7 from "./assets/member7.jpg";
import { FaTrash } from "react-icons/fa";

import linkedin from "./assets/linkedin-1.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminTeam = () => {
  const [teamData, setTeamData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Raj Bikram Maharjan",
      position: "Chairman",
      image: member1,
      description: `Raj Bikram Maharjan is a prominent figure in Nepal's drone industry, recognized for his pioneering work in unmanned aviation. With a Bachelor's degree in Aeronautical Engineering, he has extensive experience in both manned and unmanned aircraft systems. Throughout his career, Raj has designed, built, and operated various types of drones for purposes such as cinematography, surveying, search and rescue, delivery, and mapping. In addition to his technical expertise, Raj is the founder and CEO of Galli Maps, a mapping service tailored to Nepal's intricate road networks. Galli Maps addresses the limitations of conventional mapping services by providing accurate navigation through Nepal's narrow streets and alleys, enhancing the efficiency of delivery services and ride-sharing applications. Raj's entrepreneurial journey is marked by adaptability and a commitment to leveraging technology for societal benefit. His work has significantly contributed to the advancement of drone technology and mapping services in Nepal, positioning him as a key influencer in these sectors.`,
    },
    {
      name: "Pravin Lamsal",
      position: "Executive Member",
      image: member2,
      description: `Pravin Lamsal is a senior drone pilot at DrOTS Nepal, bringing over three years of experience operating various multicopter models for social good projects. He leads surveying and mapping initiatives at Geovation Nepal. Pravin holds a Bachelor's degree in Geomatics Engineering from the Himalayan College of Geomatics Engineering, affiliated with Purbanchal University in Kathmandu, Nepal. Beyond his technical expertise, Pravin is active on social media platforms, sharing insights on drone technology and geomatics engineering. Pravin's contributions to the field are also evident through his research publications, with his work cited by peers in the industry. His dedication to leveraging drone technology for societal benefits positions him as a key figure in Nepal's geomatics and unmanned aerial systems sectors.`,
    },
    {
      name: "Siddhanta Neupane",
      position: "Executive Member",
      image: member3,
      description: `Siddhanta Neupane is the Chairman of Nepal Flying Labs, the first drone startup in Nepal. With a deep passion for technology and innovation, Siddhanta has been instrumental in positioning Nepal Flying Labs as a pioneering force in the Nepali drone ecosystem. Under his leadership, Nepal Flying Labs has been at the forefront of leveraging drone technology to address critical challenges in sectors such as agriculture, disaster management, and urban development. Siddhanta's role as Chairman goes beyond overseeing operations; he actively drives strategic direction, partnerships, and the advancement of drone technology in Nepal. His commitment to creating a sustainable and thriving drone ecosystem has made Nepal Flying Labs a key player in shaping Nepal's digital and technological future. One of his significant contributions is his leadership in the Nepal Drone Ecosystem Review Project, which aims to assess and map the current landscape of drone technology in Nepal. This project, a first-of-its-kind in the country, has been essential in understanding the challenges and opportunities within the drone sector. Through his unwavering dedication to advancing the drone industry, Siddhanta Neupane has become a prominent figure in Nepal's tech community and a key advocate for the role drones will play in Nepal's future.`,
      linkedinpro: "https://www.linkedin.com/in/siddhant-neupane-8a9486147/",
    },
    {
      name: "Bikrant Karki",
      position: "Executive Member",
      image: member4,
      description: `Bikrant Karki is the Chief Executive Officer of Innovative Ghar Nepal Laboratory, a leading institution dedicated to advancing robotics and drone technology in Nepal. With a Bachelor of Engineering degree, Bikrant has established himself as a prominent figure in Nepal's technological landscape. In addition to his role at Innovative Ghar Nepal Laboratory, Bikrant is affiliated with the Robotics Academy of Nepal, where he contributes to research and development in the fields of electronics and photonics. Bikrant's expertise and leadership have been instrumental in promoting the integration of drone technology into various sectors in Nepal, including healthcare, agriculture, and disaster management. His work has significantly contributed to the development of innovative solutions that address local challenges through the application of advanced technologies. Through his dedication and vision, Bikrant continues to drive the growth of Nepal's drone ecosystem, fostering a culture of innovation and technological advancement.`,
    },
    {
      name: "Laxmi Thapa",
      position: "Executive Member",
      image: member5,
      description: `Ms. Laxmi Thapa is a dynamic professional serving as an Executive Member of the Nepal Drone Association. With a passion for technology and innovation, Laxmi plays a pivotal role in shaping the direction of the drone industry in Nepal. Her diverse experience and commitment to advancing drone technology have made her an invaluable asset to the association. As an executive member, Laxmi actively contributes to the strategic planning and implementation of the association's initiatives. She works to advocate for the adoption of drone technology in various sectors, such as agriculture, disaster management, infrastructure development, and environmental conservation. Through her leadership and insights, she helps strengthen the relationship between drone professionals, businesses, and government agencies in Nepal. Laxmi is dedicated to driving the growth and professionalization of Nepal's drone sector. She focuses on fostering collaboration and building partnerships between local and international stakeholders to share knowledge, resources, and best practices.`,
    },
    {
      name: "Khistiz Sherpa",
      position: "Executive Member",
      image: member6,
      description: `Kshitiz Kumar Subba Sherpa is a dedicated professional in Nepal's drone industry, serving as a trainer at Drone Sewa, an organization committed to advancing drone technology and its applications. In his role at Drone Sewa, Kshitiz focuses on providing comprehensive drone training programs, covering aspects such as engineering, DJI drone operations, photography, journalism, and technological innovation. His expertise and commitment to education have been instrumental in equipping individuals with the necessary skills to effectively utilize drone technology across various sectors. Kshitiz's contributions extend beyond training; he actively participates in initiatives that promote the integration of drones into diverse fields, enhancing efficiency and innovation. His work has been showcased on platforms like Facebook, where Drone Sewa shares updates and achievements related to drone technology in Nepal. Through his dedication and expertise, Kshitiz Kumar Subba Sherpa continues to play a pivotal role in the growth and development of Nepal's drone ecosystem, fostering a community that embraces technological advancement and its practical applications.`,
    },
    {
      name: "Suraj Paudel",
      position: "Executive Member",
      image: member7,
      description: `Suraj Paudel is an innovative Electronics and Communication Engineer with over a decade of experience in robotics, drone technology, and sustainable development. He currently serves as the Chief Technology Officer (CTO) at Airlift Technology Pvt. Ltd., where he leads pioneering projects that leverage drone technology for environmental conservation and infrastructure inspection. One of Suraj's notable achievements is leading the High Fly Trash Cleanup project on Mount Everest, the world's first drone-based cleanup operation at such high altitudes. This groundbreaking initiative utilized drones to collect and remove waste from the challenging terrains of Everest, significantly contributing to environmental preservation efforts. In addition to his role at Airlift Technology, Suraj is the Co-founder and CEO of Marbi Tech Industries, where he has developed Nepal's first Hydropower Penstock Inspection Robot.`,
    },
  ];

  const getTeamMembers = async () => {
    try {
      const response = await axios.get(
        "https://api.nepaldroneassociation.org.np/app/team-members/"
      );
      if (response.data && Array.isArray(response.data)) {
        const mappedMembers = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          position: item.position,
          description: item.description,
          link: item.link,
        }));
        setTeamData(mappedMembers);
        // console.log(mappedMembers);
      }
      navigate("/admin");
    } catch (error) {
      console.log("Error fetching team members", error);
    }
  };
  useEffect(() => {
    getTeamMembers();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete executive member?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `https://api.nepaldroneassociation.org.np/app/team-members/${id}/`
      );
      if (response) {
        alert("executive member deleted successfully");
        getTeamMembers();
      }
    } catch (error) {
      console.error("Failed to delete executive member", error);
    }
  };

  return (
    <>
      {/* Container with conditional max-width */}
      <div className="max-w-screen-lg xl:max-w-none 2xl:max-w-none mx-auto px-4 mt-2">
        {/* Header Section */}
        {/* <div className="mb-8 bg-gradient-to-b from-red-100 to-blue-100 rounded-md p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nepal Drone Association</h1>
          <p className="text-gray-900 text-lg mb-8">
            At the Nepal Drone Association, our team is the cornerstone of our mission to drive 
            innovation and growth in Nepal’s drone sector. Comprised of experienced 
            professionals, industry pioneers, and passionate advocates, our team brings 
            together a wealth of knowledge and expertise in drone technology, policy 
            development, and sectoral applications.<br></br>
            Each member of our team has a proven track record in areas such as drone 
            operations, regulatory advocacy, training, and fostering collaborations. Together, 
            we share a common vision to elevate Nepal’s drone industry to new heights, 
            leveraging our diverse skills to address challenges, seize opportunities, and create 
            a thriving ecosystem for drone professionals and businesses.<br></br>
            With years of collective experience in fields like agriculture, disaster management, 
            infrastructure development, and environmental conservation, we are uniquely 
            equipped to guide the industry toward sustainable growth. Our dedication to 
            excellence, innovation, and collaboration ensures that we stay at the forefront of 
            advancements in drone technology, making a lasting impact on the nation and its 
            people.<br></br>
            Join us on this journey as we pave the way for a vibrant and dynamic drone 
            industry in Nepal.
          </p>
        </div> */}

        {/* Executive Members Table */}
        <div className="mb-8 rounded-lg shadow-md overflow-hidden bg-gradient-to-r from-[#DC143C] to-[#003893] p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Members
          </h1>
          <p className="text-white text-base mb-8">
            At the Nepal Drone Association, our team is the cornerstone of our
            mission to drive innovation and growth in Nepal’s drone sector.
            Comprised of experienced professionals, industry pioneers, and
            passionate advocates, our team brings together a wealth of knowledge
            and expertise in drone technology, policy development, and sectoral
            applications.<br></br>
            Each member of our team has a proven track record in areas such as
            drone operations, regulatory advocacy, training, and fostering
            collaborations. Together, we share a common vision to elevate
            Nepal’s drone industry to new heights, leveraging our diverse skills
            to address challenges, seize opportunities, and create a thriving
            ecosystem for drone professionals and businesses.<br></br>
            With years of collective experience in fields like agriculture,
            disaster management, infrastructure development, and environmental
            conservation, we are uniquely equipped to guide the industry toward
            sustainable growth. Our dedication to excellence, innovation, and
            collaboration ensures that we stay at the forefront of advancements
            in drone technology, making a lasting impact on the nation and its
            people.<br></br>
            Join us on this journey as we pave the way for a vibrant and dynamic
            drone industry in Nepal.
          </p>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white">
              Executive Members
            </h1>
            <Link to="/add_executive_member">
              <button className="hover:bg-[#003893] text-white px-4 py-2 rounded-md bg-[#DC143C] transition duration-300">
                Add Member
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
            {teamData.map((member, index) => (
              <div
                key={index}
                className="bg-slate-600 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedMember(member)}
              >
               {/* Delete */}
                <button
                  className="absolute top-3 right-4 text-white hover:text-red-500 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal
                    handleDelete(parseInt(member.id));
                  }}
                >
                  <FaTrash className="text-red-600" size={20} />
                </button>
                <div className="flex flex-col items-center p-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-white text-center">
                    {member.name}
                  </h2>
                  <p className="text-sm text-blue-200 text-center">
                    {member.position}
                  </p>
                </div>
                <div className="flex justify-center p-2">
                </div>
              </div>
            ))}
          </div>

          {/* Modal for full description */}
          {selectedMember && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gradient-to-r from-red-100 to-blue-100 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {selectedMember.name}
                        </h3>
                        <p className="text-lg text-gray-600 mt-1">
                          {selectedMember.position}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-base leading-relaxed whitespace-pre-line text-gray-700 mb-6">
                    {selectedMember.description}
                  </p>
                  <div className="flex space-x-4 justify-end">
                    <a
                      href={selectedMember.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <img
                        src={linkedin}
                        className="w-10 hover:scale-110 transition-transform"
                        alt="LinkedIn"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminTeam;

import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import member1 from './assets/member1.jpg';
import member2 from './assets/member2.png';
import member3 from './assets/member3.jpg';
import member4 from './assets/member4.jpg';
import member5 from './assets/member5.png';
import member6 from './assets/member6.png';
import member7 from './assets/member7.jpg';

const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Raj Bikram Maharjan",
      position: "Chairman",
      image: member1, // Updated to use imported image
      description: `Raj Bikram Maharjan is a prominent figure in Nepal's drone industry, recognized for his pioneering work in unmanned aviation. With a Bachelor's degree in Aeronautical Engineering, he has extensive experience in both manned and unmanned aircraft systems. Throughout his career, Raj has designed, built, and operated various types of drones for purposes such as cinematography, surveying, search and rescue, delivery, and mapping. In addition to his technical expertise, Raj is the founder and CEO of Galli Maps, a mapping service tailored to Nepal's intricate road networks. Galli Maps addresses the limitations of conventional mapping services by providing accurate navigation through Nepal's narrow streets and alleys, enhancing the efficiency of delivery services and ride-sharing applications. Raj's entrepreneurial journey is marked by adaptability and a commitment to leveraging technology for societal benefit. His work has significantly contributed to the advancement of drone technology and mapping services in Nepal, positioning him as a key influencer in these sectors.`
    },
    {
      name: "Pravin Lamsal",
      position: "Executive Member",
      image: member2, // Will be updated with actual image URL
      description: `Pravin Lamsal is a senior drone pilot at DrOTS Nepal, bringing over three years of experience operating various multicopter models for social good projects. He leads surveying and mapping initiatives at Geovation Nepal. Pravin holds a Bachelor's degree in Geomatics Engineering from the Himalayan College of Geomatics Engineering, affiliated with Purbanchal University in Kathmandu, Nepal. Beyond his technical expertise, Pravin is active on social media platforms, sharing insights on drone technology and geomatics engineering. Pravin's contributions to the field are also evident through his research publications, with his work cited by peers in the industry. His dedication to leveraging drone technology for societal benefits positions him as a key figure in Nepal's geomatics and unmanned aerial systems sectors.`
    },
    {
      name: "Siddhanta Neupane",
      position: "Executive Member",
      image: member3, // Will be updated with actual image URL
      description: `Siddhanta Neupane is the Chairman of Nepal Flying Labs, the first drone startup in Nepal. With a deep passion for technology and innovation, Siddhanta has been instrumental in positioning Nepal Flying Labs as a pioneering force in the Nepali drone ecosystem. Under his leadership, Nepal Flying Labs has been at the forefront of leveraging drone technology to address critical challenges in sectors such as agriculture, disaster management, and urban development. Siddhanta's role as Chairman goes beyond overseeing operations; he actively drives strategic direction, partnerships, and the advancement of drone technology in Nepal. His commitment to creating a sustainable and thriving drone ecosystem has made Nepal Flying Labs a key player in shaping Nepal's digital and technological future. One of his significant contributions is his leadership in the Nepal Drone Ecosystem Review Project, which aims to assess and map the current landscape of drone technology in Nepal. This project, a first-of-its-kind in the country, has been essential in understanding the challenges and opportunities within the drone sector. Through his unwavering dedication to advancing the drone industry, Siddhanta Neupane has become a prominent figure in Nepal's tech community and a key advocate for the role drones will play in Nepal's future.`
    },
    {
      name: "Bikrant Karki",
      position: "Executive Member",
      image: member4, // Will be updated with actual image URL
      description: `Bikrant Karki is the Chief Executive Officer of Innovative Ghar Nepal Laboratory, a leading institution dedicated to advancing robotics and drone technology in Nepal. With a Bachelor of Engineering degree, Bikrant has established himself as a prominent figure in Nepal's technological landscape. In addition to his role at Innovative Ghar Nepal Laboratory, Bikrant is affiliated with the Robotics Academy of Nepal, where he contributes to research and development in the fields of electronics and photonics. Bikrant's expertise and leadership have been instrumental in promoting the integration of drone technology into various sectors in Nepal, including healthcare, agriculture, and disaster management. His work has significantly contributed to the development of innovative solutions that address local challenges through the application of advanced technologies. Through his dedication and vision, Bikrant continues to drive the growth of Nepal's drone ecosystem, fostering a culture of innovation and technological advancement.`
    },
    {
      name: "Laxmi Thapa",
      position: "Executive Member",
      image: member5, // Will be updated with actual image URL
      description: `Ms. Laxmi Thapa is a dynamic professional serving as an Executive Member of the Nepal Drone Association. With a passion for technology and innovation, Laxmi plays a pivotal role in shaping the direction of the drone industry in Nepal. Her diverse experience and commitment to advancing drone technology have made her an invaluable asset to the association. As an executive member, Laxmi actively contributes to the strategic planning and implementation of the association's initiatives. She works to advocate for the adoption of drone technology in various sectors, such as agriculture, disaster management, infrastructure development, and environmental conservation. Through her leadership and insights, she helps strengthen the relationship between drone professionals, businesses, and government agencies in Nepal. Laxmi is dedicated to driving the growth and professionalization of Nepal's drone sector. She focuses on fostering collaboration and building partnerships between local and international stakeholders to share knowledge, resources, and best practices.`
    },
    {
      name: "Khistiz Sherpa",
      position: "Executive Member",
      image: member6, // Will be updated with actual image URL
      description: `Kshitiz Kumar Subba Sherpa is a dedicated professional in Nepal's drone industry, serving as a trainer at Drone Sewa, an organization committed to advancing drone technology and its applications. In his role at Drone Sewa, Kshitiz focuses on providing comprehensive drone training programs, covering aspects such as engineering, DJI drone operations, photography, journalism, and technological innovation. His expertise and commitment to education have been instrumental in equipping individuals with the necessary skills to effectively utilize drone technology across various sectors. Kshitiz's contributions extend beyond training; he actively participates in initiatives that promote the integration of drones into diverse fields, enhancing efficiency and innovation. His work has been showcased on platforms like Facebook, where Drone Sewa shares updates and achievements related to drone technology in Nepal. Through his dedication and expertise, Kshitiz Kumar Subba Sherpa continues to play a pivotal role in the growth and development of Nepal's drone ecosystem, fostering a community that embraces technological advancement and its practical applications.`
    },
    {
      name: "Suraj Paudel",
      position: "Executive Member",
      image: member7, // Will be updated with actual image URL
      description: `Suraj Paudel is an innovative Electronics and Communication Engineer with over a decade of experience in robotics, drone technology, and sustainable development. He currently serves as the Chief Technology Officer (CTO) at Airlift Technology Pvt. Ltd., where he leads pioneering projects that leverage drone technology for environmental conservation and infrastructure inspection. One of Suraj's notable achievements is leading the High Fly Trash Cleanup project on Mount Everest, the world's first drone-based cleanup operation at such high altitudes. This groundbreaking initiative utilized drones to collect and remove waste from the challenging terrains of Everest, significantly contributing to environmental preservation efforts. In addition to his role at Airlift Technology, Suraj is the Co-founder and CEO of Marbi Tech Industries, where he has developed Nepal's first Hydropower Penstock Inspection Robot.`
    }
  ];

  const organizationalMembers = [
    "Nepal Flying Labs",
    "Airlift Technology Pvt.Ltd",
    "Geovation Nepal",
    "Innovative Ghar Pvt. Ltd",
    "Drone Sewa Pvt.Ltd",
    "Drone Hub Nepal Pvt.Ltd"
  ];

  return (
    <>
    <div className="container mx-auto px-4 mt-2">
      {/* Header Section */}
      <div className="max-w-8xl mx-auto mb-8 bg-gradient-to-b from-red-100 to-blue-100 rounded-md p-4">
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
      </div>

      {/* Executive Members Table */}
      <div className="max-w-8xl mx-auto mb-8 rounded-lg shadow-md overflow-hidden bg-gradient-to-b from-red-100 to-blue-100 p-4">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Executive Members</h1>
        </div>
        <div className="overflow-x-auto rounded-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className='bg-black'>
                <th className="px-4 py-3 text-left text-sm text-white font-semibold">Photo</th>
                <th className="px-4 py-3 text-left text-sm text-white font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white hidden md:table-cell">Position</th>
                <th className="px-4 py-3 text-left text-sm text-white font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamMembers.map((member, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <td className="px-4 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">{member.name}</td>
                  <td className="px-4 py-4 text-sm hidden md:table-cell">{member.position}</td>
                  <td className="px-4 py-4 text-sm">
                    {member.description.substring(0, 250)}
                    <span className="text-blue-900 ml-2">. . .</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Organizational Members Section */}
      <div className="max-w-8xl mx-auto rounded-lg shadow-md overflow-hidden bg-gradient-to-b from-red-200 to-blue-200 p-4 mb-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Organizational Members</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizationalMembers.map((org, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-900 font-medium">{org}</p>
              </div>
            ))}
          </div>
        </div>
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
              <p className="text-base leading-relaxed whitespace-pre-line text-gray-700">
                {selectedMember.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default TeamPage;
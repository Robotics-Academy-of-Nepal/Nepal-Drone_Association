import React, { useState } from 'react';
import Navbar from './NavBar';
import drone from './assets/drone.png';
import drone1 from './assets/drone1.png';
import drone2 from './assets/drone2.png';

const eventsData = [
  {
    id: 1,
    name: "Drone Festival 2025",
    description: "A fun event with drone, music.",
    date: "2025-04-27",
    images: [
      {
        id: 101,
        image: drone1,
        is_featured: true,
        uploaded_at: "2025-04-27T12:00:00Z"
      },
      {
        id: 102,
        image: drone,
        is_featured: false,
        uploaded_at: "2025-04-27T12:05:00Z"
      }
    ]
  },
  {
    id: 2,
    name: "Drone Test 2025",
    description: "Music concert and drone fiesta under the stars.",
    date: "2025-06-15",
    images: [
      {
        id: 201,
        image: drone2,
        is_featured: true,
        uploaded_at: "2025-06-15T18:00:00Z"
      }
    ]
  }
];

const GalleryGrid = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleImageClick = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <Navbar />
      <div className='w-full text-center mt-5 text-3xl font-bold tracking-wider'>
        <h1>Gallery</h1>
      </div>
      <div className="w-11/12 mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {eventsData.map(event => {
          const featuredImage = event.images.find(img => img.is_featured);

          return (
            <div 
              key={event.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
              onClick={() => handleImageClick(event)}
            >
              {featuredImage && (
                <img 
                  src={featuredImage.image} 
                  alt={event.name} 
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-4 text-center text-[#003893] hover:underline">
                <h2 className="text-l font-semibold mb-2">{event.name}</h2>
                {/* <p className="text-gray-500 text-sm mb-2">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{event.description}</p> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6">{selectedEvent.name} - Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedEvent.images.map(img => (
                <img 
                  key={img.id} 
                  src={img.image} 
                  alt="Event" 
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
            <button 
              onClick={closePopup} 
              className="mt-6 block mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;

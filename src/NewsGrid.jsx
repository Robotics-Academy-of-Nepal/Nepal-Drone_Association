import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import drone from './assets/drone.png';
import drone1 from './assets/drone1.png';
import drone2 from './assets/drone2.png';

const newsData = [
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
      },
      {
        id: 102,
        image: drone2,
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

const NewsGrid = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (selectedNews) {
      interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          (prevIndex + 1) % selectedNews.images.length
        );
      }, 1500); // Change image every 1.5 seconds
    }
    return () => clearInterval(interval);
  }, [selectedNews]);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setCurrentImageIndex(0);
  };

  const closePopup = () => {
    setSelectedNews(null);
  };

  return (
    <>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {newsData.map(news => {
          const featuredImage = news.images.find(img => img.is_featured);

          return (
            <div 
              key={news.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
              onClick={() => handleNewsClick(news)}
            >
              {featuredImage && (
                <img 
                  src={featuredImage.image} 
                  alt={news.name} 
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{news.name}</h2>
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(news.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{news.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup with Auto Image Slider */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button 
              onClick={closePopup} 
              className="absolute text-4xl top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="flex justify-center mb-4 mt-8">
              <img 
                src={selectedNews.images[currentImageIndex].image}
                alt="News"
                className="w-full h-72 object-cover rounded-md"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{selectedNews.name}</h2>
            <p className="text-center text-gray-500 mb-4">
              {new Date(selectedNews.date).toLocaleDateString()}
            </p>
            <p className="text-center text-gray-700">{selectedNews.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsGrid;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Import fallback images
import drone from "./assets/drone.png";
import drone1 from "./assets/drone1.png";
import drone2 from "./assets/drone2.png";

const NewsGrid = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to ensure complete image URLs
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return drone; 
    return imagePath.startsWith('http') 
      ? imagePath 
      : `https://api.nepaldroneassociation.org.np${imagePath}`;
  };

  const getNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.nepaldroneassociation.org.np/app/news-events/"
      );
      
      console.log("News API Response:", response.data);
      
      if (response.status === 200 && Array.isArray(response.data)) {
        setNewsData(response.data);
        setError(null);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    let interval;
    if (selectedNews && selectedNews.images && selectedNews.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % selectedNews.images.length
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

  // Fallback images for error cases
  const fallbackImages = [drone, drone1, drone2];

  return (
    <>
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center p-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent"></div>
          <p className="ml-3">Loading news...</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-5 my-3">
          {error}
        </div>
      )}

      {/* News grid */}
      {!loading && newsData.length > 0 && (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {newsData.map((news, newsIndex) => {
            // Find featured image or use first image
            const featuredImage = news.images && news.images.length > 0
              ? news.images.find((img) => img.is_featured) || news.images[0]
              : null;
            
            return (
              <div
                key={news.id || newsIndex}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleNewsClick(news)}
              >
                {featuredImage ? (
                  <img
                    src={getFullImageUrl(featuredImage.image)}
                    alt={news.title || "News image"}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      console.error(`Failed to load news image: ${featuredImage.image}`);
                      e.target.onerror = null;
                      e.target.src = fallbackImages[newsIndex % fallbackImages.length];
                    }}
                  />
                ) : (
                  <img
                    src={fallbackImages[newsIndex % fallbackImages.length]}
                    alt="Default news image"
                    className="w-full h-52 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-gray-500 text-sm mb-2 text-right">
                    {news.date ? new Date(news.date).toLocaleDateString() : "Date not available"}
                  </p>
                  <h2 className="text-lg font-semibold mb-2 text-justify line-clamp-2">
                    {news.title || "Untitled News"}
                  </h2>
                  <p className="text-gray-700 line-clamp-4 text-justify">
                    {news.content || "No content available"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && newsData.length === 0 && !error && (
        <div className="text-center p-12 text-gray-500">
          No news articles available at this time.
        </div>
      )}

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
            
            {selectedNews.images && selectedNews.images.length > 0 ? (
              <div className="flex justify-center mb-4 mt-8">
                <img
                  src={getFullImageUrl(selectedNews.images[currentImageIndex]?.image)}
                  alt="News"
                  className="w-full h-72 object-cover rounded-md"
                  onError={(e) => {
                    console.error(`Failed to load popup image: ${selectedNews.images[currentImageIndex]?.image}`);
                    e.target.onerror = null;
                    e.target.src = fallbackImages[currentImageIndex % fallbackImages.length];
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4 mt-8">
                <img
                  src={drone}
                  alt="Default News"
                  className="w-full h-72 object-cover rounded-md"
                />
              </div>
            )}
            
            <div>
              <p className="text-right items-end flex justify-end w-full text-gray-500 mb-2">
                {selectedNews.date ? new Date(selectedNews.date).toLocaleDateString() : "Date not available"}
              </p>
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedNews.title || "Untitled News"}</h2>
            <p className="text-gray-900 text-justify">{selectedNews.content || "No content available"}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsGrid;
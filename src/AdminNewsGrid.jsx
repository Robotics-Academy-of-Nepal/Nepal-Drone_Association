import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const AdminNewsGrid = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);

  const getNews = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.6:8100/app/news-events/"
      );
      if (response.status === 200) {
        setNewsData(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    let interval;
    if (selectedNews) {
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

  const handleDelete = async (id) => {
    alert("Are you sure you want to delete this news?");
    try {
      const response = await axios.delete(
        `http://192.168.1.6:8100/app/news-events/${id}/`
      );
      if (response) {
        alert("News deleted successfull");
        getNews();
      }
    } catch (error) {
      console.log("Failed to delete the news", error);
    }
  };

  return (
    <>
      <div className=" p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {newsData.map((news) => {
          const featuredImage = news.images.find((img) => img.is_featured);

          return (
            <div
              key={news.id}
              className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
              onClick={() => handleNewsClick(news)}
            >
              <div className="absolute top-1 right-2 text-red p-1 rounded-full cursor-pointer">
                <div className="flex items-center gap-4">
                  <FaEdit
                    className="text-blue-500 text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <FaTrash
                    className="text-red-500"
                    onClick={(e) => {
                      handleDelete(news.id);
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
              {featuredImage && (
                <img
                  src={featuredImage.image}
                  alt={news.name}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-4 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    {new Date(news.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700">{news.content}</p>
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
            <h2 className="text-2xl font-bold text-center mb-2">
              {selectedNews.name}
            </h2>
            <p className="text-center text-gray-500 mb-4">
              {new Date(selectedNews.date).toLocaleDateString()}
            </p>
            <p className="text-center text-gray-700">
              {selectedNews.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNewsGrid;

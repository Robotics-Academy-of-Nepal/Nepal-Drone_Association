import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import axios from "axios";
// import { FaTrash } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
import { FaTrash, FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AdminNewsGrid = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [image, setImage] = useState(null);

  const getNews = async () => {
    try {
      const response = await axios.get(
        "https://api.nepaldroneassociation.org.np/app/news-events/"
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

  // const getFullImageUrl = (url) => {
  //   if (!url) {
  //     return ;
  //   }
  //   if (url.startsWith("http")) {
  //     return url;
  //   }
  //   return `https://api.nepaldroneassociation.org.np${url}`;
  // };
  const getFullImageUrl = (imagePath) => {
      if (!imagePath) return "https://via.placeholder.com/300x200?text=No+Image"; 
      return imagePath.startsWith('http') 
        ? imagePath 
        : `https://api.nepaldroneassociation.org.np${imagePath}`;
    };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Gallery?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `https://api.nepaldroneassociation.org.np/app/news-events/${id}/`
      );
      if (response) {
        alert("News deleted successfull");
        getNews();
      }
    } catch (error) {
      console.log("Failed to delete the news", error);
    }
  };

  const handleSubmit = async (id) => {
    const formData = new FormData();
    formData.append("news_event", id);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `https://api.nepaldroneassociation.org.np/app/news-event-images/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        alert("Image uploaded successfully");
        setIsFormOpen(false);
        getNews();
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const handleSpecificDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `https://api.nepaldroneassociation.org.np/app/news-event-images/${id}/`
      );
      if (response) {
        alert("Image deleted successfully");
        getNews(); 
      }
    } catch (error) {
      console.error("Failed to delete image", error);
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
                  {/* <FaEdit
                    className="text-blue-500 text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  /> */}
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
                  src={getFullImageUrl(featuredImage.image)}
                  alt={news.name}
                  className="w-full h-52 object-cover mt-10"
                />
              )}
              <div className="p-4 mt-3">
              <p className="text-gray-500 text-sm mb-2 text-right">
                    {new Date(news.date).toLocaleDateString()}
                  </p>
                {/* <div className="flex justify-between items-center mb-2"> */}
                  <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
                {/* </div> */}
                <p className="text-gray-700 line-clamp-4">{news.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup with Auto Image Slider */}
      {/* {selectedNews && (
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
              {selectedNews.title}
            </h2>
            <p className="text-center text-gray-500 mb-4">
              {new Date(selectedNews.date).toLocaleDateString()}
            </p>
            <p className="text-center text-gray-700">{selectedNews.content}</p>
          </div>
        </div>
      )} */}

      {selectedNews && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <h2 className="text-2xl font-bold text-center">
                      {selectedNews.name} - Images
                    </h2>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="text-center bg-blue-500 rounded-md text-white px-3 py-1"
                    >
                      Add Image
                    </button>
                  </div>
                  {isFormOpen && (
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit(selectedNews.id);
                          className =
                            "flex flex-col items-center p-4 bg-white shadow-md rounded-lg shadow-gray-300 my-3";
                        }}
                      >
                        <div className="flex justify-end items-end w-full">
                          <RxCross2
                            onClick={() => setIsFormOpen(false)}
                            className="text-gray-900 text-lg "
                          />
                        </div>
                        <p className="text-center text-black mb-4 font-normal text-lg">
                          Add Image
                        </p>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="mb-4 w-full border border-gray-300 rounded p-3"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button
                          type="submit"
                          className="mt-6 block mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                          Upload
                        </button>
                      </form>
                    </div>
                  )}
                  <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedNews.images.map((img) => (
                      <div key={img.id} className="relative">
                        <div className="absolute top-1 right-2 text-red p-1 rounded-full cursor-pointer z-10">
                          {/* <p>{img.event}</p> */}
                          <FaTrash
                            className="text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpecificDelete(img.id);
                            }}
                          />
                        </div>
                        <img
                          src={getFullImageUrl(img.image)}
                          alt="Event"
                          className="w-full h-40 object-cover rounded mt-7"
                        />
                      </div>
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

export default AdminNewsGrid;

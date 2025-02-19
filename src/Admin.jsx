import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from './assets/drone.png';
import drone18 from './assets/drone18.jpg';
import drone19 from './assets/drone19.jpg';
import drone21 from './assets/drone21.jpg';
import Navbar from "./NavBar";
import Footer from "./Footer";
import { Camera, Battery, Gauge } from "lucide-react";
import { ChevronLeft, ChevronRight, Edit, Trash, Plus } from 'lucide-react';
import Navbar2 from './Navbar2';

const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null
  });

  useEffect(() => {
      setIsVisible(true);
    }, []);

  const specs = [
      {
        icon: <Camera className="w-8 h-8 mb-3" />,
        title: "Camera",
        description: "20 MP Resolution 4k at 30 FPS",
      },
      {
        icon: <Battery className="w-8 h-8 mb-3" />,
        title: "Battery",
        description: "Max Flight time 45 Minutes",
      },
      {
        icon: <Gauge className="w-8 h-8 mb-3" />,
        title: "Speed",
        description: "Max Speed 79 MPH (22m/s)",
      },
    ];
  

  const API_URL = 'https://api.nepaldroneassociation.org.np/app/images/';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Token ${token}` }
      });
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
      imagePreview: URL.createObjectURL(file)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    
    // Only append image if a new image file is selected
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
  
    try {
      if (isEditModalOpen) {
        await axios.put(`${API_URL}${selectedNews.id}`, formDataToSend, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // For new news items, image should be required
        if (!formData.image && !isEditModalOpen) {
          alert('Please select an image');
          return;
        }
        await axios.post(API_URL, formDataToSend, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchNews();
      closeModal();
    } catch (error) {
      console.error('Error submitting news:', error);
      // Add better error handling
      if (error.response) {
        alert(JSON.stringify(error.response.data));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await axios.delete(`${API_URL}${id}`, {
          headers: { Authorization: `Token ${token}` }
        });
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handleEdit = (newsItem) => {
    setSelectedNews(newsItem);
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      image: null, // Keep this null initially
      imagePreview: newsItem.image // Keep the existing image preview
    });
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedNews(null);
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: null
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= news.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 < 0 ? Math.max(0, news.length - 3) : prevIndex - 3
    );
  };

  return (
    <>
    <Navbar2 />

    <div className="container mx-auto px-4 mt-2">
            {/* First section with drone image */}
            <div className="bg-gradient-to-b from-red-200 to-blue-200">
              <div className="mt-2 w-full text-wrap flex items-center rounded-md px-2 lg:flex-row">
                <div className="sm:text-lg md:text-4xl lg:text-6xl xl:text-7xl px-4">
                  <p>The most interesting drone in the world</p>
                </div>
                <div className="relative h-auto overflow-hidden">
                  <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                    <img src={image} alt="Drone" className="w-full h-auto object-contain animate-hover" />
                  </div>
                </div>
              </div>
    
              {/* Specs section */}
              <div className="rounded-lg mx-auto p-6 mt-2">
                <div className="rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {specs.map((spec, index) => (
                      <div key={spec.title} className="flex flex-col items-center text-center p-4">
                        {spec.icon}
                        <h3 className="text-lg font-semibold mb-2">{spec.title}</h3>
                        <p className="text-sm text-gray-600">{spec.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
    
            {/* Image sections */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch mt-2 mb-2 rounded-2xl">
              <div className="w-fit lg:w-1/2 flex">
                <img src={drone19} className="w-200 h-auto lg:h-100 object-cover rounded-2xl" alt="Drone" />
              </div>
              <div className="w-fit mx-2 lg:w-1/1 bg-gradient-to-tr from-red-200 to-blue-200 p-6 flex items-center justify-center rounded-2xl">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-center">We Use The Best Drones & HD Cameras</h2>
                  <p className="mt-2 text-sm md:text-base text-center">
                    It can be equipped with a variety of additional equipment, including cameras, GPS guided missiles,
                    Global Positioning Systems (GPS), navigation systems, sensors, and so on.
                  </p>
                  <p className="mt-2 text-sm md:text-base text-center">
                    DroCam 3.4k is the updated version of the very popular DroCam 3 drone. As you may believe, the most attention went to the camera.
                  </p>
                </div>
              </div>
            </div>
    
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl">
              <div className="bg-gradient-to-tr from-red-200 to-blue-200 w-fit lg:w-1/1 p-6 bg-gray-300 flex items-center justify-center rounded-2xl">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-center">Hovering and Automatic Flight Positioning</h2>
                  <p className="mt-2 text-sm md:text-base text-center">
                    Besides being able to fly without you worrying about it ramming into
                    objects, this drone can hover. As it has done in other products.
                  </p>
                  <p className="mt-2 text-sm md:text-base text-center">
                    DroCam has included its Vision Positioning System(VPS), VPS locks the drone
                    in place when necessary, and it can stay put for hours.
                  </p>
                </div>
              </div>
              <div className="w-fit lg:w-1/2 flex mx-2">
                <img className="w-150 h-auto lg:h-100 object-cover rounded-2xl" src={drone21} alt="Drone" />
              </div>
            </div>
    
            <div className="lg:w-full mt-2 flex">
              <img className="w-full rounded-2xl cursor-pointer lg:w-full" src={drone18} alt="Drone" />
            </div>



    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} /> Add News
        </button>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scroll-snap-type-x-mandatory scroll-snap-align-start">
          {news.slice(currentIndex, currentIndex + 3).map((item) => (
            <div
              key={item.id}
              className="flex-none w-full sm:w-1/2 md:w-1/3 p-4 bg-white rounded-lg shadow-md scroll-snap-align-start"
            >
              <div className="relative aspect-video mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          disabled={currentIndex + 3 >= news.length}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isEditModalOpen ? 'Edit News' : 'Add News'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {formData.imagePreview && (
                  <img
                  type="file"
                    src={formData.imagePreview}
                    alt="Preview"
                    className="mt-2 h-32 object-cover rounded"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {isEditModalOpen ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default NewsSlider;
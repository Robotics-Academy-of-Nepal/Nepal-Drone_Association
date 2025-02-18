import React, { useEffect, useState } from 'react';
import axios from 'axios';
import image from './assets/drone.png';
import drone18 from './assets/drone18.jpg';
import drone19 from './assets/drone19.jpg';
import drone21 from './assets/drone21.jpg';
import Navbar2 from './Navbar2';
import { Camera, Battery, Gauge, Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Admin() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: null
  });
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/');
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news images');
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      photo: null
    });
    setEditingNews(null);
  };

  const openEditModal = (news) => {
    setFormData({
      title: news.title || '',
      description: news.description || '',
      photo: null
    });
    setEditingNews(news);
    setIsEditModalOpen(true);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.photo) {
        formDataToSend.append('image', formData.photo);
      }

      await axios.post('https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/', formDataToSend, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchImages();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to add news');
    }
  };

  const handleEditNews = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.photo) {
        formDataToSend.append('image', formData.photo);
      }

      await axios.put(`https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/${editingNews.id}/`, formDataToSend, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchImages();
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to edit news');
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await axios.delete(`https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/${newsId}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        fetchImages();
      } catch (err) {
        setError('Failed to delete news');
      }
    }
  };

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

  const truncateText = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const createSlides = () => {
    if (loading) return [];
    if (error) return [];

    return images.map((image, index) => ({
      id: index,
      preview: (
        <div className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 w-full h-full p-6 text-center rounded-2xl border-2 flex flex-col relative">
          <div className="relative w-full pb-[66.67%] mb-4">
            <img 
              src={image.image_url} 
              alt={image.title} 
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(image);
                }}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNews(image.id);
                }}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg h-14 line-clamp-2 mb-2">{truncateText(image.title, 8)}</h3>
              <p className="text-base h-20 line-clamp-4">{truncateText(image.description, 20)}</p>
            </div>
            <div className="mt-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Read More
              </button>
            </div>
          </div>
        </div>
      ),
      fullContent: {
        title: image.title,
        description: image.description,
        image: image.image_url
      }
    }));
  };

  const NewsForm = ({ onSubmit, isEdit }) => (
    <form onSubmit={onSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload News Photo
        </label>
        <label className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
          <Upload className="w-5 h-5 mr-2" />
          Choose Photo
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {formData.photo && <p className="mt-2 text-sm text-gray-600">Selected: {formData.photo.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          News Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          News Description
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {isEdit ? 'Update News' : 'Add News'}
      </button>
    </form>
  );

  const slides = createSlides();
  const slidesPerView = 3;
  const totalSlides = Math.ceil(slides.length / slidesPerView);

  const getVisibleSlides = () => {
    const startIdx = currentSlide * slidesPerView;
    return slides.slice(startIdx, startIdx + slidesPerView);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const openModal = (slideIndex) => {
    setSelectedSlideIndex(slideIndex);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto px-4 mt-2">
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

        <div className="relative w-full max-w-6xl mx-auto mt-4 mb-4">
          {loading ? (
            <div className="text-center p-8 bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-2xl">
              Loading news...
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-2xl">
              {error}
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-6 h-full">
                  {getVisibleSlides().map((slide, index) => {
                    const absoluteIndex = currentSlide * slidesPerView + index;
                    return (
                      <div
                        key={slide.id}
                        className="aspect-[3/4] cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => openModal(absoluteIndex)}
                      >
                        {slide.preview}
                      </div>
                    );
                  })}
                </div>

                {slides.length > slidesPerView && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add News
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add News</h2>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <NewsForm onSubmit={handleAddNews} isEdit={false} />
            </div>
          </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit News</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <NewsForm onSubmit={handleEditNews} isEdit={true} />
          </div>
        </div>
      )}
       
             {/* Updated Modal */}
             {isModalOpen && selectedSlideIndex !== null && slides[selectedSlideIndex] && (
               <div
                 className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
                 onClick={() => {
                   setIsModalOpen(false);
                   setSelectedSlideIndex(null);
                 }}
               >
                 <div
                   className="bg-gradient-to-r from-red-200 via-purple-100 to-blue-200 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all"
                   onClick={(e) => e.stopPropagation()}
                 >
                   <div className="p-8">
                     <div className="flex justify-between items-center mb-6">
                       <h2 className="text-2xl font-semibold">
                         {slides[selectedSlideIndex].fullContent.title}
                       </h2>
                       <button
                         onClick={() => {
                           setIsModalOpen(false);
                           setSelectedSlideIndex(null);
                         }}
                         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                         aria-label="Close modal"
                       >
                         <X className="w-8 h-8" />
                       </button>
                     </div>
       
                     <div className="mb-6 ">
                       <img
                         src={slides[selectedSlideIndex].fullContent.image}
                         alt={slides[selectedSlideIndex].fullContent.title}
                         className="w-full max-h-[60vh] object-contain rounded-lg"
                       />
                     </div>
       
                     <div className="prose max-w-none text-lg">
                       <div className="space-y-4">
                         {slides[selectedSlideIndex].fullContent.description.split('\n').map((paragraph, index) => (
                           paragraph.trim() && (
                             <p key={index} className="mb-4">
                               {paragraph.trim()}
                             </p>
                           )
                         ))}

                         
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             )}
        </div>

        </>
  )
}

export default Admin;
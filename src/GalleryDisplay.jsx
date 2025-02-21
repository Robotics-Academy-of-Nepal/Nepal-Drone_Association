import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import Footer from './Footer';
import VideoPlayer from './VideoPlayer';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.nepaldroneassociation.org.np/app/gallery/');
        
        console.log('Raw API Response:', response);
        console.log('API Data:', response.data);

        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          const imageArray = response.data.results || response.data.images || [];
          setImages(imageArray);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images && images.map((image, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image container */}
              <div className="aspect-w-16 aspect-h-12 cursor-pointer">
                <img
                  src={image.image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
              </div>

              {/* Hover overlay */}
              <button
                onClick={() => openModal(image)}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 cursor-pointer"
              >
                <span className="opacity-0 group-hover:opacity-100 text-white bg-black/50 px-4 py-2 rounded-lg transform transition-all duration-300">
                  View
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Fullscreen Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-screen-xl w-full h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage?.image}
                  alt="Full size"
                  className="max-h-[90vh] max-w-full w-auto h-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <VideoPlayer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImageGallery;
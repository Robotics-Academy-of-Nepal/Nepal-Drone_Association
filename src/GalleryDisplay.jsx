import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import Footer from './Footer';
import VideoPlayer from './VideoPlayer';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.nepaldroneassociation.org.np/app/gallery/');
        
        // Log the response for debugging
        console.log('Raw API Response:', response);
        console.log('API Data:', response.data);

        // Directly set the response data if it's an array
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          // If response.data is an object containing the array
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images && images.map((image, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden">
            <img
              src={image.image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-8">
              <VideoPlayer />
            </div>
    </div>
    <Footer />
    </>
  );
};

export default ImageGallery;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar2 from './Navbar2';

const GalleryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState([]);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages([...images, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create the event (without images)
      const response = await axios.post('https://api.nepaldroneassociation.org.np/app/gallery-events/', {
        name,
        description,
        date,
      });

      const createdEvent = response.data;

      // Step 2: Upload images
      for (let i = 0; i < images.length; i++) {
        const imgForm = new FormData();
        imgForm.append('event', createdEvent.id); // Make sure backend expects this field
        imgForm.append('image', images[i]);
        imgForm.append('is_featured', i === featuredImageIndex);

        await axios.post('https://api.nepaldroneassociation.org.np/app/gallery-images/', imgForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert('Event and images uploaded successfully!');
      setName('');
      setDescription('');
      setDate('');
      setImages([]);
      setFeaturedImageIndex(null);
      navigate('/galleryupload');
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      console.log('Date value:', date);
      alert('Upload failed. See console for more info.');
    }
  };

  return (
    <>
    <Navbar2/>
    <div className="p-6 max-w-xl mx-auto shadow-gray-300 mt-8 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add Gallery Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Add Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        {images.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold">Select Featured Image:</p>
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center mt-1">
                <input
                  type="radio"
                  name="featured"
                  checked={featuredImageIndex === idx}
                  onChange={() => setFeaturedImageIndex(idx)}
                  className="mr-2"
                />
                <span>{img.name}</span>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Gallery Images
        </button>
      </form>
    </div>
    </>
  );
};

export default GalleryForm;

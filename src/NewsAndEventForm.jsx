import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewsAndEventForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      // Step 1: Create the news/event first (without images)
      const response = await axios.post('http://192.168.1.6:8100/app/news-events/', {
        title,
        content,
        date,
      });
  
      const createdNewsEvent = response.data;
  
      // Step 2: Upload images one by one using FormData
      for (let i = 0; i < images.length; i++) {
        const imgForm = new FormData();
        imgForm.append('news_event', createdNewsEvent.id); // make sure your serializer accepts this field
        imgForm.append('image', images[i]);
        imgForm.append('is_featured', i === featuredImageIndex);
  
        await axios.post('http://192.168.1.6:8100/app/news-event-images/', imgForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      alert('News and images uploaded successfully!');
      setTitle('');
      setContent('');
      setDate('');
      setImages([]);
      setFeaturedImageIndex(null);
      navigate('/AdminNews');
    } catch (error) {
      console.log('Upload failed:', error.response?.data || error.message);
      console.log('Date value:', date);
      alert('Upload failed. See console for more.');
    }
  };
  

  return (
    <div className="p-4 max-w-xl mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add News & Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="block w-full mb-2 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          className="block w-full mb-2 p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="date"
          className="block w-full mb-4 p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Add Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-4"
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
          Submit News & Images
        </button>
      </form>
    </div>
  );
};

export default NewsAndEventForm;

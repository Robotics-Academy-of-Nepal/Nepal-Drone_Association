import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Slider3 from './Slider3';

function AdminNews() {
    
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post(
        'https://api.nepaldroneassociation.org.np/app/images/',
        formData,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('News added successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to add news'}`);
    }
  };

  const resetFormAndCloseModal = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setMessage('');
    setIsModalOpen(false);
  };

  return (
      <>
      <Navbar2 />
    <div className="max-w-screen-md mx-auto mt-8 px-4">
        
      <h1 className="text-3xl font-bold text-center mb-6">Admin - Add News</h1>
      
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add News
        </button>
      </div>

      {message && (
        <div className="mt-4 text-center text-green-600 font-medium">
          {message}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add News</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mt-1 block w-full text-sm text-gray-500 border-1 p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetFormAndCloseModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Add News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
    <Slider3 />
    </>
  );
}

export default AdminNews;


import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import News from "./NewsGrid";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminNewsGrid from './AdminNewsGrid';


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
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add News
        </button> */}
        <Link
                to="/AddNewsEvents"
                className="block mx-auto px-3 py-2 text-white bg-[#003893] hover:bg-[#DC143C] rounded-md"
              >
                Add News
        </Link>
      </div>

      {message && (
        <div className="mt-4 text-center text-green-600 font-medium">
          {message}
        </div>
      )}

    </div>
    <AdminNewsGrid/>
    </>
  );
}

export default AdminNews;


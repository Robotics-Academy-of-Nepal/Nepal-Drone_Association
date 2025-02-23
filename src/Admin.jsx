import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import drone18 from './assets/drone18.jpg';
import About from './About';
import TeamPage from './Team';
import ImageSlider from './Slider';
import { Users, Building2, Plane, UserPlus } from "lucide-react";
import Slider3 from './Slider3';
import Navbar2 from './Navbar2';

function Homepage2() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const specs = [
    {
      icon: <Users className="w-8 h-8 mb-3" />,
      title: "Drone Pilots",
      description: "100+ Professional Pilots",
    },
    {
      icon: <Building2 className="w-8 h-8 mb-3" />,
      title: "Institutions",
      description: "30+ Partner Institutions",
    },
    {
      icon: <Plane className="w-8 h-8 mb-3" />,
      title: "Drones",
      description: "20+ Advanced Drones",
    },
    {
      icon: <UserPlus className="w-8 h-8 mb-3" />,
      title: "Members",
      description: "800+ Active Members",
    },
  ];

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
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('News added successfully!');
        // Clear the form and close the modal
        setTitle('');
        setDescription('');
        setImage(null);
        setIsModalOpen(false); // Close the modal
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to add news'}`);
    }
  };

  // Function to reset the form and close the modal
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
      <div className="container mx-auto px-4 mt-2">
        {/* First section with drone image */}
        <div className="bg-gradient-to-b from-red-200 to-blue-200">
          <div className="mt-2 w-full text-wrap flex items-center rounded-md px-2 lg:flex-row">
            <div className="text-xs sm:text-sm md:text-2xl lg:text-5xl xl:text-5xl px-2">
              <p className="font-['Orbitron'] tracking-wider">
                <span className="text-sky-500">Connecting Skies</span>
                <span className="mx-1">,</span>
                <br className="sm:hidden" />
                <span className="text-red-400">Transforming Lives</span>
              </p>
            </div>
            <div className="relative h-auto overflow-hidden">
              <ImageSlider />
            </div>
          </div>

          {/* Specs section */}
          <div className="rounded-lg mx-auto p-6 mt-2">
            <div className="rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <About />
        <TeamPage />

        <div className="lg:w-full mt-2 flex">
          <img className="w-full rounded-2xl cursor-pointer lg:w-full" src={drone18} alt="Drone" />
        </div>

        {/* News slider section */}
        <div className="relative w-full max-w-8xl mx-auto mt-8 mb-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsModalOpen(true)} // Open the modal
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add News
            </button>
          </div>
          <Slider3 />
        </div>

        {/* Success Message */}
        {message && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            {message}
          </div>
        )}

        {/* Modal for Add News Form */}
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetFormAndCloseModal} // Reset form and close modal
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add News
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Homepage2;
import React, { useState } from 'react';
import { Upload, Plus, Send } from 'lucide-react';
import Navbar2 from './Navbar2';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

const AdminPanel = () => {
  const [newsPhoto, setNewsPhoto] = useState(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('title', newsTitle);
      formData.append('description', newsDescription);
      formData.append('image', newsPhoto);

      const response = await fetch('https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}` // Assuming token is stored in localStorage after login
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to create news post');
      }

      const data = await response.json();
      setSuccessMessage('News item created successfully!');
      setNewsPhoto(null);
      setNewsTitle('');
      setNewsDescription('');
      
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      setNewsPhoto(file);
      setError('');
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Manage your news content</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* News Upload Section */}
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Create News Post</h2>
              </div>

              <form onSubmit={handleNewsSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload News Photo
                  </label>
                  <label className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  {newsPhoto && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {newsPhoto.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    News Heading
                  </label>
                  <input
                    type="text"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter news title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    News Description
                  </label>
                  <textarea
                    value={newsDescription}
                    onChange={(e) => setNewsDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter news description"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Publish News
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
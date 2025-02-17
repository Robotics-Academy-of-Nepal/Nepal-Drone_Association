import React, { useState } from 'react';
import { Upload, Image, Plus, Send, FolderPlus, X } from 'lucide-react';
import Navbar2 from './Navbar2';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

const AdminPanel = () => {
  const [galleries, setGalleries] = useState([]);
  const [newGalleryName, setNewGalleryName] = useState('');
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [newsPhoto, setNewsPhoto] = useState(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateGallery = (e) => {
    e.preventDefault();
    const newGallery = {
      id: Date.now(),
      name: newGalleryName,
      photos: []
    };
    setGalleries([...galleries, newGallery]);
    setNewGalleryName('');
    setShowGalleryForm(false);
    setSuccessMessage('Gallery created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePhotoUpload = (galleryId, e) => {
    const files = Array.from(e.target.files);
    setGalleries(galleries.map(gallery => {
      if (gallery.id === galleryId) {
        const newPhotos = files.map(file => ({
          id: Date.now() + Math.random(),
          url: URL.createObjectURL(file)
        }));
        return {
          ...gallery,
          photos: [...gallery.photos, ...newPhotos]
        };
      }
      return gallery;
    }));
    setSuccessMessage('Photos uploaded successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const removePhoto = (galleryId, photoId) => {
    setGalleries(galleries.map(gallery => {
      if (gallery.id === galleryId) {
        return {
          ...gallery,
          photos: gallery.photos.filter(photo => photo.id !== photoId)
        };
      }
      return gallery;
    }));
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    console.log({
      photo: newsPhoto,
      title: newsTitle,
      description: newsDescription
    });
    setSuccessMessage('News item created successfully!');
    setNewsPhoto(null);
    setNewsTitle('');
    setNewsDescription('');
    setTimeout(() => setSuccessMessage(''), 3000);
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

        <div className="space-y-6">
          {/* Gallery Management Section */}
          {/* <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Gallery Management</h2>
              </div>
              <button
                onClick={() => setShowGalleryForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FolderPlus className="w-5 h-5 mr-2" />
                Create Gallery
              </button>
            </div> */}

            {/* Create Gallery Form */}
            {/* {showGalleryForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <form onSubmit={handleCreateGallery} className="flex gap-4">
                  <input
                    type="text"
                    value={newGalleryName}
                    onChange={(e) => setNewGalleryName(e.target.value)}
                    placeholder="Enter gallery name"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGalleryForm(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )} */}

            {/* Galleries */}
            {/* <div className="space-y-6">
              {galleries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No galleries created yet</p>
              ) : (
                galleries.map(gallery => (
                  <div key={gallery.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">{gallery.name}</h3>
                      <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 mr-2" />
                        Add Photos
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={(e) => handlePhotoUpload(gallery.id, e)}
                        />
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {gallery.photos.map(photo => (
                        <div key={photo.id} className="relative group">
                          <img
                            src={photo.url}
                            alt="Gallery"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePhoto(gallery.id, photo.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card> */}

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
                    onChange={(e) => setNewsPhoto(e.target.files[0])}
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
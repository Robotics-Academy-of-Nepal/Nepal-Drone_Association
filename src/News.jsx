import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, X } from 'lucide-react';
import Navbar2 from './Navbar2';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    title: '',
    description: ''
  });

  // Token should be stored in your auth management system
  const token = localStorage.getItem('token');
  
  const headers = {
    Authorization: `Token ${token}`
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/', { headers });
      setNews(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news');
      setLoading(false);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingId(newsItem.id);
    setEditForm({
      title: newsItem.title,
      description: newsItem.description
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('description', editForm.description);
      
      await axios.patch(`https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/${editingId}/`, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        }
      });
      
      setEditingId(null);
      fetchNews();
    } catch (err) {
      setError('Failed to update news item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await axios.delete(`https://4dkf27s7-8000.inc1.devtunnels.ms/app/images/${id}/`, { headers });
        fetchNews();
      } catch (err) {
        setError('Failed to delete news item');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
    <Navbar2 />
    <div className="container mx-auto px-2 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {item.image_url && (
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {editingId === item.id ? (
              <form onSubmit={handleUpdate} className="p-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Description"
                  rows="3"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default NewsList;
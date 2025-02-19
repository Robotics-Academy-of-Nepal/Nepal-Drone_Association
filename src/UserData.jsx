import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import axios from 'axios';
import { X } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem('token');
  
  const headers = {
    Authorization: `Token ${token}`
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.nepaldroneassociation.org.np/app/signup/', { headers });
      
      if (response.data.status === "success" && response.data.users) {
        setUsers(response.data.users);
      } else {
        setError('No user data found.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const ImageModal = ({ url, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-[90vh] bg-white p-4 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <img 
          src={url} 
          alt="Document" 
          className="max-h-[80vh] object-contain" 
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar2 />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Drone Experience</th>
                <th className="px-4 py-2 text-left">Involvement Type</th>
                <th className="px-4 py-2 text-left">Citizenship</th>
                <th className="px-4 py-2 text-left">Registration Document</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.contact_no}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{user.drone_experience}</td>
                  <td className="px-4 py-2 capitalize">{user.involvement_type}</td>
                  <td className="px-4 py-2">
                    {user.citizenship_url ? (
                      <img
                        src={user.citizenship_url}
                        alt="Citizenship Document"
                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => setSelectedImage(user.citizenship_url)}
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.regd_document_url ? (
                      <img
                        src={user.regd_document_url}
                        alt="Registration Document"
                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => setSelectedImage(user.regd_document_url)}
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedImage && (
          <ImageModal
            url={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </>
  );
};

export default UserList;
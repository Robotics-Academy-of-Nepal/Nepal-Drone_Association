import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  
  const headers = {
    Authorization: `Token ${token}`
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://4dkf27s7-8000.inc1.devtunnels.ms/app/signup/', { headers });
        
        // Check if the response contains user data
        if (response.data.status === "success" && response.data.users) {
          setUsers(response.data.users);
        } else {
          setError('No user data found.');
        }
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <>
    <Navbar2 />
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
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
              <tr key={user.email} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contact_no}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">{user.drone_experience}</td>
                <td className="px-4 py-2 capitalize">{user.involvement_type}</td>
                <td className="px-4 py-2">
                  {user.citizenship_upload ? (
                    <img
                      src={user.citizenship_url}
                      alt="Citizenship Document"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-4 py-2">
                  {user.regd_document_upload ? (
                    <img
                      src={user.regd_document_url}
                      alt="Registration Document"
                      className="w-16 h-16 object-cover rounded"
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
    </div>
    </>
  );
};

export default UserList;
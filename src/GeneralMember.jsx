import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const GeneralMembers = () => {
  const [generalMember, setGeneralMember] = useState([]);
  const token = localStorage.getItem("token");

  const getGeneralMember = async () => {
    try {
      const response = await axios.get(
        "https://api.nepaldroneassociation.org.np/app/general-members/"
      );
      if (response.status === 200) {
        setGeneralMember(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  useEffect(() => {
    getGeneralMember();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `https://api.nepaldroneassociation.org.np/app/general-members/${id}/`
      );
      if (response) {
        alert("General member deleted successfully");
        getGeneralMember();
      }
    } catch (error) {
      console.error("Failed to delete organization", error);
    }
  };

  return (
    <div className="max-w-screen-lg xl:max-w-none 2xl:max-w-none mx-auto px-4 mt-2">
      {/* Organizational Members Section */}
      <div className="rounded-lg shadow-md overflow-hidden bg-gradient-to-l from-[#DC143C] to-[#003893] p-4 mb-4">
        <div className="p-6 border-b border-gray-200">
          {token && (
            <div className="flex justify-end items-end mb-2">
              <Link to="/add_general_member">
                <button className="bg-[#003893] text-white px-4 py-2 rounded-md hover:bg-[#DC143C] transition text-nowrap duration-300">
                  Add General Member
                </button>
              </Link>
            </div>
          )}
          <h2 className="text-xl font-semibold text-white">General Members</h2>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {generalMember ? (
              generalMember.map((org, index) => (
                <div key={index} className="relative w-24 h-24 mx-auto">
                  <a
                    href={org.link}
                    title={org.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={org.image}
                      alt={org.name}
                      className="w-24 h-24 rounded-full object-cover border-white border"
                    />
                  </a>
                  {token && (
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete(org.id);
                    }}
                    title="Delete member"
                    className="absolute top-2 right-1 transform -translate-y-1/2 p-1 rounded-full shadow"
                  >
                    <FaTrash className="text-red-500 text-sm" />
                  </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white text-lg">
                No organization data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralMembers;

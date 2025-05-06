import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminAddOrganization = () => {
  const [origanizationData, setOrganizationData] = useState([]);

  const getOrganizationData = async () => {
    try {
      const response = await axios.get(
        "https://api.nepaldroneassociation.org.np/app/organizational-members/"
      );
      if (response.status === 200) {
        setOrganizationData(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  useEffect(() => {
    getOrganizationData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `https://api.nepaldroneassociation.org.np/app/organizational-members/${id}/`
      );
      if (response) {
        alert("organization deleted successfully");
        getOrganizationData();
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
          <div className="flex justify-end items-end mb-2">
            <Link to="/add_organization">
              <button className="bg-[#003893] text-white px-4 py-2 rounded-md hover:bg-[#DC143C] transition text-nowrap duration-300">
                Add Organization
              </button>
            </Link>
          </div>
          <h2 className="text-xl font-semibold text-white">
            Organizational Members
          </h2>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {origanizationData ? (
              origanizationData.map((org, index) => (
                <a
                  key={index}
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    title={org.name}
                    className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative w-full h-14">
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="w-full h-full object-contain rounded"
                      />
                      <div className="absolute top-1 right-1 p-1 rounded-full cursor-pointer z-10 bg-white">
                        <FaTrash
                          className="text-red-500 text-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDelete(org.id);
                          }}
                        />
                      </div>
                    </div>
                    {/* <p className="text-gray-900 font-medium text-center py-2">{org.name}</p> */}
                  </div>
                </a>
              ))
            ) : (
              <>
                <p className="text-white text-lg">
                  No organization data available
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddOrganization;

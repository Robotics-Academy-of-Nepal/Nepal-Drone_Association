import axios from "axios";
import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

function AddGeneralMembers() {
  const [name, setName] = useState("");
  const [image, setimage] = useState(null);
  const [link, setLink] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("link", link);
    try {
      const response = await axios.post(
        `https://api.nepaldroneassociation.org.np/app/general-members/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log(response);
        alert("general member added successfully");
        navigate('/admin');
      }
    } catch (error) {
      console.error("Failed to post the formdata", error);
    }
  };
  return (
    <>
      {token ? <Navbar2 /> : <Navbar />}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 rounded-lg shadow-gray-300 shadow-md mt-10"
      >
        <h2 className="text-xl font-bold mb-4">Add General Member</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setimage(e.target.files[0])}
            accept="image/*"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Add Linkedin Link</label>
          <input
            type="text"
            name="link"
            onChange={(e) => setLink(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}
export default AddGeneralMembers;

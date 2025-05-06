import axios from "axios";
import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";

function AddExecutiveMember() {
  const [name, setName] = useState("");
  const [image, setimage] = useState(null);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("link", link);
    formData.append("position", position);
    formData.append("description", description);
    try {
      const response = await axios.post(
        `https://api.nepaldroneassociation.org.np/app/team-members/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log(response);
        alert("organization added successfully");
        navigate('/admin');
      }
    } catch (error) {
      console.error("Failed to post the formdata", error);
    }
  };
  return (
    <>
      <Navbar2 />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 rounded-lg shadow-gray-300 shadow-md mt-10"
      >
        <h2 className="text-xl font-bold mb-4">Add Executive Member</h2>
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
          <label className="block mb-1 font-semibold">Select Position</label>
          <select
            className=" px-3 py-2 w-full rounded border"
            name="position"
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="Select Position" disabled>
              Select Postion
            </option>
            <option value="Chairman">Chairman</option>
            <option value="Exeecutive Member">Executive Member</option>
            {/* <option value="Secratory">Secratory</option> */}
            {/* <option value="Treasurer">Treasurer</option> */}
            <option value="Member">Member</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Add Link</label>
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
export default AddExecutiveMember;

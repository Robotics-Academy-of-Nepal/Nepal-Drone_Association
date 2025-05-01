import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AdminGalleryGrid = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [image, setImage] = useState(null);

  const getGalleryEvents = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.6:8100/app/gallery-events/"
      );
      if (response.status === 200) {
        setGalleryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching gallery events:", error);
    }
  };

  useEffect(() => {
    getGalleryEvents();
  }, []);

  const handleImageClick = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Gallery?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://192.168.1.6:8100/app/gallery-events/${id}/`
      );
      if (response) {
        alert("Gallery images deleted successfull");
        getGalleryEvents();
      }
    } catch (error) {
      console.log("Failed to delete the news", error);
    }
  };

  const handleSpecificDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://192.168.1.6:8100/app/gallery-images/${id}/`
      );
      if (response.status === 204 || response.status === 200) {
        setSelectedEvent((prevEvent) => ({
          ...prevEvent,
          images: prevEvent.images.filter((img) => img.id !== id),
        }));
        alert("Image deleted successfully.");
      }
    } catch (error) {
      console.error("Failed to delete the image:", error);
    }
  };

  const handleSubmit = async (id) => {
    const formData = new FormData();
    formData.append("event", id);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `http://192.168.1.6:8100/app/gallery-images/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        alert("Image uploaded successfully");
        setIsFormOpen(false);
        getGalleryEvents();
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  return (
    <>
      <div className="w-full text-center text-3xl font-bold tracking-wider">
        {/* <h1>Gallery</h1> */}
      </div>

      <div className="w-11/12 mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {galleryData.map((event) => {
          const featuredImage = event.images.find((img) => img.is_featured);
          return (
            <div
              key={event.id}
              className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
              onClick={() => handleImageClick(event)}
            >
              <div className="absolute top-1 right-2 text-red p-1 rounded-full cursor-pointer">
                <div className="flex items-center gap-4">
                  {/* <FaEdit
                                        className="text-blue-500 text-xl"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    /> */}
                  <FaTrash
                    className="text-red-500"
                    onClick={(e) => {
                      handleDelete(event.id);
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
              {featuredImage && (
                <img
                  src={featuredImage.image}
                  alt={event.name}
                  className="w-full h-52 object-cover mt-10"
                />
              )}
              <div className="p-4 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup (no auto slider, static grid like original) */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-center gap-4 mb-5">
              <h2 className="text-2xl font-bold text-center">
                {selectedEvent.name} - Images
              </h2>
              <button
                onClick={() => setIsFormOpen(true)}
                className="text-center bg-blue-500 rounded-md text-white px-3 py-1"
              >
                Add Image
              </button>
            </div>
            {isFormOpen && (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(selectedEvent.id);
                    className =
                      "flex flex-col items-center p-4 bg-white shadow-md rounded-lg shadow-gray-300 my-3";
                  }}
                >
                  <div className="flex justify-end items-end w-full">
                    <RxCross2
                      onClick={() => setIsFormOpen(false)}
                      className="text-gray-900 text-lg "
                    />
                  </div>
                  <p className="text-center text-black mb-4 font-normal text-lg">
                    Add Image
                  </p>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="mb-4 w-full border border-gray-300 rounded p-3"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <button
                    type="submit"
                    className="mt-6 block mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Upload
                  </button>
                </form>
              </div>
            )}
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedEvent.images.map((img) => (
                <div key={img.id} className="relative">
                  <div className="absolute top-1 right-2 text-red p-1 rounded-full cursor-pointer z-10">
                    {/* <p>{img.event}</p> */}
                    <FaTrash
                      className="text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpecificDelete(img.id);
                      }}
                    />
                  </div>
                  <img
                    src={img.image}
                    alt="Event"
                    className="w-full h-40 object-cover rounded mt-7"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={closePopup}
              className="mt-6 block mx-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminGalleryGrid;

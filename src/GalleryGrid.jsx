import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "./NavBar";

const GalleryGrid = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getGalleryEvents = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8100/app/gallery-events/");
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


    return (
        <>
          <Navbar />
            <div className="w-full text-center text-3xl font-bold tracking-wider mt-6">
                <h1>Gallery</h1>
            </div>

            <div className="w-11/12 mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {galleryData.map((event) => {
                    const featuredImage = event.images.find((img) => img.is_featured);
                    return (
                        
                        <div
                            key={event.id}
                            className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
                            onClick={() => handleImageClick(event)} >
                            <div className="text-center hover:underline text-[#003893]">
                              <p>Click to view more</p>
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
                        <h2 className="text-2xl font-bold text-center mb-6">
                            {selectedEvent.name} - Images
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {selectedEvent.images.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image}
                                    alt="Event"
                                    className="w-full h-40 object-cover rounded"
                                />
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

export default GalleryGrid;

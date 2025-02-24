import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Edit, Trash2 } from 'lucide-react';

const Slider3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editCard, setEditCard] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.nepaldroneassociation.org.np/app/images/');
      setCards(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getCardsPerView = () => {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, cards.length - getCardsPerView()));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
    setEditCard(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.nepaldroneassociation.org.np/app/images/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      fetchData(); // Refresh the data after deletion
      setDeleteConfirmation(null); // Close the confirmation dialog
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editCard.title);
    formData.append('description', editCard.description);
    if (editCard.image instanceof File) {
      formData.append('image', editCard.image);
    }

    try {
      const response = await axios.put(`https://api.nepaldroneassociation.org.np/app/images/${editCard.id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update the cards state directly
      setCards((prevCards) => prevCards.map((card) => (card.id === editCard.id ? response.data : card)));

      // Show success message
      setSuccessMessage('News updated successfully!');
      setTimeout(() => setSuccessMessage(null), 5000); // Hide the message after 5 seconds

      closePopup();
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / getCardsPerView())}%)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-full lg:w-1/3 md:w-1/2 p-6 transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleCardClick(card)}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <img
                src={card.image_url}
                alt={card.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-bold mt-4 h-16 truncate" title={card.title}>
                {card.title}
              </h2>
              <p className="text-gray-600 mt-2 h-24 overflow-hidden" title={card.description}>
                {card.description}
              </p>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button onClick={(e) => { e.stopPropagation(); setEditCard(card); }} className="text-blue-500">
                  <Edit size={20} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmation(card.id); }} className="text-red-500">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg">
        &lt;
      </button>
      <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg">
        &gt;
      </button>

      {/* Selected Card Popup */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full h-[90vh] mx-4 relative flex flex-col">
            <button onClick={closePopup} className="absolute top-4 right-4">
              <X size={24} className="text-gray-600 hover:text-gray-900" />
            </button>
            <div className="p-4">
              <img src={selectedCard.image_url} alt={selectedCard.title} className="w-auto max-w-full h-64 object-contain rounded" />
              <h2 className="text-2xl font-bold mt-4">{selectedCard.title}</h2>
              <p className="text-gray-600 mt-2">{selectedCard.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Popup */}
      {editCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full h-[90vh] mx-4 relative flex flex-col">
            <button onClick={closePopup} className="absolute top-4 right-4">
              <X size={24} className="text-gray-600 hover:text-gray-900" />
            </button>
            <form onSubmit={handleEditSubmit} className="p-4 flex-1 overflow-y-auto">
              <input
                type="text"
                value={editCard.title}
                onChange={(e) => setEditCard({ ...editCard, title: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Title"
              />
              <textarea
                value={editCard.description}
                onChange={(e) => setEditCard({ ...editCard, description: e.target.value })}
                className="w-full p-2 border rounded mt-4"
                placeholder="Description"
              />
              <img
                src={editCard.image_url}
                alt="Preview"
                className="w-auto max-w-full h-64 object-contain mt-4 rounded"
              />
              <input
                type="file"
                onChange={(e) => setEditCard({ ...editCard, image: e.target.files[0] })}
                className="w-full p-2 border rounded mt-4"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer">Update Card</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this News?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(null)} // Cancel deletion
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmation)} // Confirm deletion
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider3;
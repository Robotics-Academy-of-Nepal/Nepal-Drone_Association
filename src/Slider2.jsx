import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
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

    fetchData();
  }, []);

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
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="relative w-full max-w-8xl px-5 mx-auto overflow-hidden ">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / getCardsPerView())}%)` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-full lg:w-1/4 md:w-1/2 p-6 transition-transform duration-300 hover:scale-105 cursor-pointer "
            onClick={() => handleCardClick(card)}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg bg-gradient-to-b from-red-200 to-blue-200">
              <img
                src={card.image_url}
                alt={card.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4 h-16 truncate" title={card.title}>
                {card.title.length > 10 ? `${card.title.substring(0, 30)}...` : card.title}
              </h2>
              <p className="text-gray-600 mt-2 h-24 overflow-hidden" title={card.description}>
                {card.description.split(' ').length > 60
                  ? `${card.description.split(' ').slice(0, 80).join(' ')}...`
                  : card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        disabled={currentIndex === 0}
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        disabled={currentIndex >= cards.length - getCardsPerView()}
      >
        &gt;
      </button>

      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4">
          <div className="bg-gradient-to-b from-red-200 to-blue-200 rounded-lg max-w-3xl w-full h-[90vh] mx-4 relative flex flex-col">
            <button onClick={closePopup} className="absolute top-4 right-4">
              <X size={24} className="text-gray-600 hover:text-gray-900" />
            </button>
            <div className="p-4 flex-1 overflow-y-auto">
              <img
                src={selectedCard.image_url}
                alt={selectedCard.title}
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{selectedCard.title}</h2>
              <div className="mt-2 p-2 border-t">
                <p className="text-gray-700 whitespace-pre-line">{selectedCard.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;

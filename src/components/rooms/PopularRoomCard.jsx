import React from 'react';
import { FaBed, FaStar, FaRegHeart, FaHeart, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaCoffee } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import roomImage from '../../assets/images/room.jpeg';

const PopularRoomCard = () => {
  const [favorites, setFavorites] = React.useState([]);

  const popularRooms = [
    {
      id: 1,
      name: 'Deluxe Ocean View',
      price: 450,
      rating: 4.9,
      location: 'Beach Front',
      description: 'Experience breathtaking ocean views from your private balcony in our most sought-after room',
      amenities: ['Free WiFi', 'Pool Access', 'Breakfast Included'],
      isPopular: true
    },
    {
      id: 2,
      name: 'Executive Suite',
      price: 380,
      rating: 4.7,
      location: 'City View',
      description: 'Spacious suite with premium amenities and panoramic city skyline views',
      amenities: ['Free WiFi', 'Executive Lounge', '24/7 Concierge'],
      isPopular: true
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-serif font-bold text-[#003B95] mb-3">Our Popular Rooms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our guests' favorite accommodations with exceptional amenities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {popularRooms.map((room) => (
            <div
              key={room.id}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden h-72">
                <img
                  src={roomImage}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Favorite button */}
                <button 
                  onClick={() => toggleFavorite(room.id)}
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full shadow-sm z-10"
                >
                  {favorites.includes(room.id) ? (
                    <FaHeart className="text-red-500 text-lg" />
                  ) : (
                    <FaRegHeart className="text-gray-600 text-lg hover:text-red-500" />
                  )}
                </button>
                
                {/* Popular badge */}
                {room.isPopular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                    <FaStar className="text-yellow-300" /> Popular Choice
                  </div>
                )}
                
                {/* Detail overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-end transition-all duration-300">
                  <div className="w-full bg-gradient-to-t from-black to-transparent p-5 pt-10">
                    <div className="flex items-center text-white mb-2">
                      <FaStar className="text-yellow-300 mr-1" />
                      <span className="font-medium mr-2">{room.rating}</span>
                      <span className="text-sm opacity-90">({Math.floor(room.rating * 20)} reviews)</span>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-white mb-1">{room.name}</h3>
                    <div className="flex items-center text-white text-sm opacity-90">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{room.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room info */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {amenity.includes('WiFi') && <FaWifi className="mr-1 text-[#003B95]" />}
                      {amenity.includes('Pool') && <FaSwimmingPool className="mr-1 text-[#003B95]" />}
                      {amenity.includes('Breakfast') && <FaCoffee className="mr-1 text-[#003B95]" />}
                      {amenity}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-[#003B95] font-bold text-xl">
                    ${room.price}<span className="text-gray-500 text-base font-normal"> / night</span>
                  </div>
                  <button className="bg-[#003B95] hover:bg-[#002D75] text-white px-6 py-2 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRoomCard;
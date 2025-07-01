import React from 'react';
import { FaBed, FaStar, FaRegHeart, FaHeart, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaCoffee } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
const API_BASE = 'https://notfounders-001-site1.anytempurl.com/';

const PopularRoomCard = () => {
  const [favorites, setFavorites] = React.useState([]);
  const { data: rooms, error } = useSWR(`${API_BASE}api/Room/get-all`, fetcher);

  const staticRoomData = {
    rating: 4.7,
    location: 'Premium Location',
    isPopular: true,
    amenities: ['Free WiFi', 'Pool Access', 'Breakfast Included']
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (error) return <div className="text-center py-16">Failed to load rooms</div>;
  if (!rooms) return <div className="text-center py-16">Loading rooms...</div>;

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
          {rooms
            .filter(room => room.name == "King")
            .map((room) => (
              <div
                key={room.id}
                className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div className="relative overflow-hidden h-72">
                  {room.imgKeys && room.imgKeys.length > 0 && (
                    <img
                      src={`https://cavid.s3.eu-north-1.amazonaws.com/${room.imgKeys[0]}`}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* <button
                    onClick={() => toggleFavorite(room.id)}
                    className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full shadow-sm z-10"
                  >
                    {favorites.includes(room.id) ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-lg hover:text-red-500" />
                    )}
                  </button> */}

                  {staticRoomData.isPopular && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                      <FaStar className="text-yellow-300" /> Popular Choice
                    </div>
                  )}

                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 flex items-end transition-all duration-300">
                    <div className="w-full bg-gradient-to-t from-black to-transparent p-5 pt-10">
                      <div className="flex items-center text-white mb-2">
                        <FaStar className="text-yellow-300 mr-1" />
                        <span className="font-medium mr-2">{staticRoomData.rating}</span>
                        <span className="text-sm opacity-90">({Math.floor(staticRoomData.rating * 20)} reviews)</span>
                      </div>
                      <h3 className="text-2xl font-serif font-semibold text-white mb-1">{room.name}</h3>
                      <div className="flex items-center text-white text-sm opacity-90">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{staticRoomData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{room.description || 'Luxurious accommodation with premium amenities'}</p>

                  <div className="flex flex-wrap gap-3 mb-5">
                    {staticRoomData.amenities.map((amenity, index) => (
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
                      ${room.pricePerNight}<span className="text-gray-500 text-base font-normal"> / night</span>
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

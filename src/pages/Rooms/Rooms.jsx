
import React from 'react';
import { Star, Users, Bed, Wifi, Car, Coffee, MapPin, Heart } from 'lucide-react';

const RoomCard = ({ room }) => {
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi size={16} />;
      case 'parking': return <Car size={16} />;
      case 'breakfast': return <Coffee size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
            <Heart size={20} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#003B95] text-white px-3 py-1 rounded-full text-sm font-medium">
            ${room.price}/night
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {room.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium text-gray-700">
              {room.rating} ({room.reviews})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Room Details */}
        <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{room.capacity} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{room.beds} bed{room.beds > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-50 text-[#003B95] px-2 py-1 rounded-md text-xs"
            >
              {getAmenityIcon(amenity)}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
          {room.amenities.length > 3 && (
            <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
              +{room.amenities.length - 3} more
            </div>
          )}
        </div>

        {/* Book Now Button */}
        <button className="w-full bg-[#003B95] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 transform hover:scale-105">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;

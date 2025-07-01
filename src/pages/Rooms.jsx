import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaStar, FaBed, FaWifi, FaSwimmingPool, FaCoffee, FaSnowflake, FaTv, FaParking, FaUmbrellaBeach, FaCar, FaUtensils, FaDollarSign, FaExpand, FaHeart, FaInfoCircle, FaShare } from 'react-icons/fa';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { allRooms } from '../constants/api';

const Rooms = () => {
  const navigate = useNavigate();

  // State for interactive card features
  const [favorites, setFavorites] = useState(new Set());
  const [expandedCard, setExpandedCard] = useState(null);

  // Fake data for rooms - Updated to include more fields

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Amenities options - Added more relevant icons
  const amenitiesOptions = [
    { id: 'Free WiFi', name: 'WiFi', icon: <FaWifi /> },
    { id: 'Pool Access', name: 'Pool', icon: <FaSwimmingPool /> },
    { id: 'Breakfast Included', name: 'Breakfast', icon: <FaCoffee /> },
    { id: 'Air Conditioning', name: 'AC', icon: <FaSnowflake /> },
    { id: 'Smart TV', name: 'TV', icon: <FaTv /> },
    { id: 'Parking', name: 'Parking', icon: <FaCar /> }, // Changed icon
    { id: 'Restaurant', name: 'Restaurant', icon: <FaUtensils /> } // Changed icon
  ];

  // Filter rooms
  const filteredRooms = allRooms.filter(room => {
    // Search filter
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase()); // Added location to search

    // Price filter
    const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];

    // Amenities filter
    const matchesAmenities = selectedAmenities.length === 0 ||
      selectedAmenities.every(amenity =>
        room.amenities.some(item => item.toLowerCase().includes(amenity.toLowerCase())));

    return matchesSearch && matchesPrice && matchesAmenities;
  });

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    // Default: popularity (can keep or change based on reviews, etc.)
    // Using reviews for default popularity sort
    return b.reviews - a.reviews;
  });

  // Categorize rooms
  const popularRooms = sortedRooms.filter(room => room.type === 'popular');
  const comfortRooms = sortedRooms.filter(room => room.type === 'comfort');
  // Keep other categories for potential future use or display
  const standardRooms = sortedRooms.filter(room => room.type === 'standard');
  const luxuryRooms = sortedRooms.filter(room => room.type === 'luxury');
  const familyRooms = sortedRooms.filter(room => room.type === 'family');


  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  // Handlers for interactive card features
  const handleDetailClick = (id) => {
    navigate(`/rooms/${id}`); // Assumes a detail route exists
  };

  const handleFavoriteClick = (id, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleShareClick = (room, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `Check out this amazing room: ${room.name} for $${room.price}/night`,
        url: window.location.href // Or a specific room URL if available
      });
    } else {
      navigator.clipboard.writeText(window.location.href); // Or a specific room URL
      alert('Link copied to clipboard!');
    }
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Free WiFi': <FaWifi />,
      'Pool Access': <FaSwimmingPool />,
      'Breakfast Included': <FaCoffee />,
      'Air Conditioning': <FaSnowflake />,
      'Smart TV': <FaTv />,
      'Parking': <FaCar />,
      'Restaurant': <FaUtensils />
      // Add more amenity icons here
    };
    // Find the amenity option by name (case-insensitive match might be needed)
    const matchedAmenity = amenitiesOptions.find(opt => amenity.toLowerCase().includes(opt.name.toLowerCase()));
    return matchedAmenity ? matchedAmenity.icon : null;
  };


  const handleExpandClick = (id, e) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === id ? null : id);
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}

      <div
        className="relative h-100 bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://hips.hearstapps.com/hmg-prod/images/oakland-california-master-bedroom-1489084768.jpg?crop=1xw:0.9357454772301934xh;center,top&resize=1200:*')",
        }}

      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-serif font-bold mb-4 pt-6">Our Rooms & Suites</h1>
          <p className="text-lg">Find your perfect accommodation for a memorable stay</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8 -mt-10 relative z-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search rooms by name, description, or location..." // Updated placeholder
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-blue-100 text-blue-800 px-4 py-3 rounded-lg hover:bg-blue-200 transition"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters {showFilters ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popular">Sort by: Popularity</option>
              <option value="price-low">Sort by: Price (Low to High)</option>
              <option value="price-high">Sort by: Price (High to Low)</option>
              <option value="rating">Sort by: Rating</option>
            </select>
          </div>

          {/* Collapsible Filter Content */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-screen opacity-100 pt-4 mt-4 border-t border-gray-200' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="mb-4 md:mb-0"> {/* Added mb-0 for medium screens */}
              <h3 className="font-semibold mb-2 text-gray-700">Price Range: ${priceRange[0]} - ${priceRange[1]}</h3>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500" // Added styling for range input
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1"> {/* Added mt-1 */}
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Amenities</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2"> {/* Adjusted grid columns for responsiveness */}
                {amenitiesOptions.map(amenity => (
                  <button
                    key={amenity.id}
                    className={`flex flex-col items-center p-2 rounded-lg border text-sm transition-colors duration-200 ${selectedAmenities.includes(amenity.id) ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`} // Added hover effect
                    onClick={() => toggleAmenity(amenity.id)}
                  >
                    <span className="text-base mb-1">{amenity.icon}</span> {/* Adjusted icon size */}
                    <span className="text-xs font-medium">{amenity.name}</span> {/* Added font-medium */}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Popular Rooms */}
        {popularRooms.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6 flex items-center">
              <FaStar className="text-yellow-400 mr-2" /> Popular Rooms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto"> {/* Adjusted grid layout */}
              {popularRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isFavorite={favorites.has(room.id)}
                  isExpanded={expandedCard === room.id}
                  onDetailClick={handleDetailClick}
                  onFavoriteClick={handleFavoriteClick}
                  onShareClick={handleShareClick}
                  onExpandClick={handleExpandClick}
                  getAmenityIcon={getAmenityIcon} // Pass the amenity icon getter
                />
              ))}
            </div>
          </div>
        )}

        {/* Comfort Rooms */}
        {comfortRooms.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Comfort Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto"> {/* Adjusted grid layout */}
              {comfortRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isFavorite={favorites.has(room.id)}
                  isExpanded={expandedCard === room.id}
                  onDetailClick={handleDetailClick}
                  onFavoriteClick={handleFavoriteClick}
                  onShareClick={handleShareClick}
                  onExpandClick={handleExpandClick}
                  getAmenityIcon={getAmenityIcon}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Rooms */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">All Rooms</h2>
          {sortedRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No rooms match your search criteria. Please adjust your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto"> {/* Adjusted grid layout */}
              {sortedRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isFavorite={favorites.has(room.id)}
                  isExpanded={expandedCard === room.id}
                  onDetailClick={handleDetailClick}
                  onFavoriteClick={handleFavoriteClick}
                  onShareClick={handleShareClick}
                  onExpandClick={handleExpandClick}
                  getAmenityIcon={getAmenityIcon}
                />
              ))}
            </div>
          )}
        </div>
        {/* Hidden categories - can be removed if not needed */}
        {/*
        {luxuryRooms.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Luxury Suites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {luxuryRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}

        {familyRooms.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Family Accommodations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {familyRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}

        {standardRooms.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">Standard Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standardRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

// Room Card Component - Updated to match RoomCards.jsx design
const RoomCard = ({ room, isFavorite, isExpanded, onDetailClick, onFavoriteClick, onShareClick, onExpandClick, getAmenityIcon }) => {
  return (
    <div
      key={room.id}
      className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden border border-gray-100 ${!room.available ? 'opacity-75' : ''
        } ${isExpanded ? 'transform scale-105 z-10' : 'hover:transform hover:scale-105'
        }`}
      onClick={() => onDetailClick(room.id)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={room.image} // Using room.image from the data
          alt={room.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Status Badge */}
        {!room.available && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sold Out
          </div>
        )}

        {/* Discount Badge */}
        {room.discount > 0 && room.available && ( // Check discount > 0
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{room.discount}%
          </div>
        )}

        {/* Action Icons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            onClick={(e) => onFavoriteClick(room.id, e)}
          >
            {/* <FaHeart
              className={`text-lg transition-colors duration-200 ${
                isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`} 
            /> */}
          </button>
          <button
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            onClick={(e) => onShareClick(room, e)}
          >
            <FaShare className="text-lg text-gray-600 hover:text-[#003B95] transition-colors duration-200" />
          </button>
          <button
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            onClick={(e) => onExpandClick(room.id, e)}
          >
            <FaExpand className="text-lg text-gray-600 hover:text-[#003B95] transition-colors duration-200" />
          </button>
        </div>

        {/* Detail Icon */}
        <div
          className="absolute bottom-4 right-4 bg-[#003B95] p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-[#0056d2]"
          onClick={(e) => {
            e.stopPropagation();
            onDetailClick(room.id);
          }}
        >
          <FaInfoCircle className="text-white text-lg" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Room Title & Rating */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#003B95] flex items-center gap-2 mb-2 group-hover:text-[#0056d2] transition-colors duration-200">
            <FaBed className="text-lg" /> {room.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-sm font-semibold text-gray-700 ml-1">{room.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({room.reviews} reviews)</span>
          </div>
        </div>

        {/* Room Details */}
        {/* Added Location here based on original Rooms.jsx */}
        {room.location && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <FaInfoCircle className="mr-2 opacity-0" /> {/* Placeholder for alignment */}
            <span>{room.location}</span>
          </div>
        )}
        <div className="mb-4 space-y-2">
          {/* Added description here based on original Rooms.jsx */}
          {room.description && (
            <p className="text-sm text-gray-600">{room.description}</p>
          )}
          <div className="flex justify-between text-sm text-gray-600">
            {room.size && <span>Size: {room.size}</span>}
            {room.guests && <span>Guests: {room.guests}</span>}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-gray-100 p-2 rounded-lg text-[#003B95] hover:bg-[#003B95] hover:text-white transition-all duration-200 group/amenity"
                title={amenity} // Use the full amenity name for title
              >
                {getAmenityIcon(amenity)}
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
            {/* You can add more detailed info here if available in room data */}
            <p className="text-sm text-gray-600 mb-2">
              Luxurious accommodation with modern amenities and stunning views. Perfect for both business and leisure travelers. {/* This text is static, could be dynamic */}
            </p>
            {/* Example static badges, can be made dynamic based on room features */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Free Cancellation</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Pay at Hotel</span>
            </div>
          </div>
        )}

        {/* Price & Booking */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#003B95] font-bold text-xl">
                <FaDollarSign className="text-lg" />
                <span>{room.price}</span>
              </div>
              {room.originalPrice && room.discount > 0 && ( // Show original price only if discount > 0
                <span className="text-gray-400 line-through text-sm">
                  ${room.originalPrice}
                </span>
              )}
            </div>
            <span className="text-gray-500 text-sm">per night</span>
          </div>

          <button
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${room.available
              ? 'bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white hover:shadow-lg hover:shadow-[#003B95]/25'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!room.available}
          // Removed onClick here to rely on the card's main onClick for detail page
          // Add if a specific book now action is needed besides detail
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#003B95]/20 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default Rooms;
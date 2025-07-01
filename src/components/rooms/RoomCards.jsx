import { useNavigate } from 'react-router-dom'
import roomImage from '../../assets/images/room.jpeg'
import { useState } from 'react'
import { FaBed, FaCar, FaDollarSign, FaExpand, FaHeart, FaInfoCircle, FaShare, FaStar, FaUtensils, FaWifi } from 'react-icons/fa'

const RoomCards = () => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState(new Set())
  const [expandedCard, setExpandedCard] = useState(null)

  const rooms = [
    { 
      id: 1, 
      name: 'Deluxe Ocean View', 
      price: 120, 
      originalPrice: 150,
      rating: 4.8,
      reviews: 124,
      amenities: ['wifi', 'parking', 'restaurant'],
      available: true,
      discount: 20,
      size: '35 m²',
      guests: 2
    },
    { 
      id: 2, 
      name: 'Executive Suite', 
      price: 150, 
      originalPrice: 180,
      rating: 4.9,
      reviews: 89,
      amenities: ['wifi', 'parking', 'restaurant'],
      available: true,
      discount: 17,
      size: '45 m²',
      guests: 4
    },
    { 
      id: 3, 
      name: 'Standard Room', 
      price: 100, 
      originalPrice: 120,
      rating: 4.6,
      reviews: 156,
      amenities: ['wifi', 'restaurant'],
      available: false,
      discount: 17,
      size: '25 m²',
      guests: 2
    },
    { 
      id: 4, 
      name: 'Presidential Suite', 
      price: 180, 
      originalPrice: 220,
      rating: 5.0,
      reviews: 67,
      amenities: ['wifi', 'parking', 'restaurant'],
      available: true,
      discount: 18,
      size: '65 m²',
      guests: 6
    },
  ]

  const handleDetailClick = (id) => {
    navigate(`/rooms/${id}`)
  }

  const handleFavoriteClick = (id, e) => {
    e.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const handleShareClick = (room, e) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `Check out this amazing room: ${room.name} for $${room.price}/night`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <FaWifi />,
      parking: <FaCar />,
      restaurant: <FaUtensils />
    }
    return icons[amenity] || null
  }

  const handleExpandClick = (id, e) => {
    e.stopPropagation()
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="py-16 container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#003B95] to-[#0056d2] bg-clip-text text-transparent">
          Our Premium Rooms
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Experience luxury and comfort in our carefully designed accommodations
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#003B95] to-[#0056d2] mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden border border-gray-100 ${
              !room.available ? 'opacity-75' : ''
            } ${
              expandedCard === room.id ? 'transform scale-105 z-10' : 'hover:transform hover:scale-105'
            }`}
            onClick={() => handleDetailClick(room.id)}
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={roomImage}
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
              {room.discount && room.available && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  -{room.discount}%
                </div>
              )}

              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  onClick={(e) => handleFavoriteClick(room.id, e)}
                >
                  <FaHeart
                    className={`text-lg transition-colors duration-200 ${
                      favorites.has(room.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`} 
                  />
                </button>
                <button
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  onClick={(e) => handleShareClick(room, e)}
                >
                  <FaShare className="text-lg text-gray-600 hover:text-[#003B95] transition-colors duration-200" />
                </button>
                <button
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                  onClick={(e) => handleExpandClick(room.id, e)}
                >
                  <FaExpand className="text-lg text-gray-600 hover:text-[#003B95] transition-colors duration-200" />
                </button>
              </div>

              {/* Detail Icon */}
              <div
                className="absolute bottom-4 right-4 bg-[#003B95] p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-[#0056d2]"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDetailClick(room.id)
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
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Size: {room.size}</span>
                  <span>Guests: {room.guests}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <div className="flex gap-2 flex-wrap">
                  {room.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-2 rounded-lg text-[#003B95] hover:bg-[#003B95] hover:text-white transition-all duration-200 group/amenity"
                      title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                    >
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCard === room.id && (
                <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
                  <p className="text-sm text-gray-600 mb-2">
                    Luxurious accommodation with modern amenities and stunning views. Perfect for both business and leisure travelers.
                  </p>
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
                    {room.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ${room.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">per night</span>
                </div>
                
                <button 
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    room.available
                      ? 'bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white hover:shadow-lg hover:shadow-[#003B95]/25'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!room.available}
                  onClick={(e) => e.stopPropagation()}
                >
                  {room.available ? 'Book Now' : 'Unavailable'}
                </button>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#003B95]/20 transition-all duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-[#003B95]/5 to-[#0056d2]/5 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#003B95] mb-4">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6">
            Our concierge team is available 24/7 to help you find the perfect room for your stay.
          </p>
          <button className="bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#003B95]/25 transition-all duration-300 transform hover:scale-105">
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCards